import { RefObject, useState, useEffect } from 'react'

import { BreakpointType, getBreakpoint } from '../helpers/browser'

/* ========================================================================= */
/* Keyboard */
/* ========================================================================= */

type WatchersType = {
    [key: string]: (e: KeyboardEvent) => void
}

/**
 * Custom hook generating keyboard event listeners. Based on the method key names provided
 * in the watchers object, methods will be fired whenever they match the code name triggered. 
 */
export const useKeyboard = (watchers: WatchersType, ref?: RefObject<HTMLElement>) => {

    const handleKeyDown = (event: KeyboardEvent) => {
        if (typeof watchers?.[event.code] === 'function') {
            watchers[event.code](event)
        }
    }

    useEffect(() => {
        const target = ref?.current || window
        target.addEventListener('keydown', handleKeyDown as EventListener, true)
        return () => target.removeEventListener('keydown', handleKeyDown as EventListener, true)
    }, [ watchers ])
}

/* ========================================================================= */
/* Resize */
/* ========================================================================= */

type DimensionsType = {
    width: number | null,
    height: number | null
}

/**
 * Subscribes the callback to the resize event and returns the window dimensions.
 * 1. Handy function get reassign the window dimensions.
 * 2. Sets the window dimensions when rendered in the browser.
 * 3. Subscribes the callback to the resize event.
 * 4. Removes the resize listener on clean up.
 */
export const useViewport = (callback: () => void, dependencies: any[] = []): DimensionsType => {
    const [ dimensions, setDimensions ] = useState<DimensionsType>({ width: null, height: null })

    /* [1] */
    const getDimensions = () => setDimensions({
        width: innerWidth,
        height: innerHeight,
    })

    const getDimensionsAndCallback = () => {
        getDimensions()
        callback && callback()
    }

    useEffect(() => {
        getDimensionsAndCallback() /* [2] */
        window.addEventListener('resize', getDimensionsAndCallback) /* [3] */
        return () => window.removeEventListener('resize', getDimensionsAndCallback) /* [4] */
    }, dependencies)

    return dimensions
}

/**
 * Subscribes to the viewport resizes and returns the active breakpoint.
 * If no breakpoints are provided, the complete list will be used
 * as a default (as registered in the checkers file).
 */
export const useBreakpoint = (breakpoints: BreakpointType[], initialValue: BreakpointType | null = null): BreakpointType | null => {
    const [ breakpoint, setBreakpoint ] = useState(initialValue)

    useViewport(() => setBreakpoint(getBreakpoint(breakpoints)))

    return breakpoint
}

/**
 * Subscribes to an element dimensions.
 */
export const useDimensions = (ref: RefObject<HTMLElement>) => {
    const [ dimensions, setDimensions ] = useState<DOMRect | null>(null)

    useViewport(() => {
        setDimensions(ref.current?.getBoundingClientRect() || null)
    }, [ ref.current ])

    return dimensions
}

/* ========================================================================= */
/* Gestures */
/* ========================================================================= */

type SwipeSyntheticEvent = {
    x: number
    y: number
    deltaX: number
    deltaY: number
}

type SwipeConfig = {
    onSwipeUp?: () => void
    onSwipeLeft?: () => void
    onSwipeRight?: () => void
    onSwipeDown?: () => void
    onComplete?: () => void
    onCancel?: () => void
    onMove?: (e: SwipeSyntheticEvent) => void
    thresholdSwipe?: number
    thresholdDirectionLock?: number
    ref: RefObject<HTMLElement>
}

/**
 * Provides an interface to manage the swipe events on a specific element.
 * 1. Initiates the constant state/references to be used by the event callbacks.
 * 2. Initiates the variable states to be used by the event callbacks.
 * 3. Defines the logic on mouse/touch move.
 * 3.1. Generates the delta based on the saved start position and the current position.
 * 3.2. Generates a synthetic event to be passed to the callbacks.
 * 3.3. Defines the current mouvement state on which relies the movement permissions.
 * 3.4. If the movement has reached the direction lock threshold passed in the parameters,
 *      it will lock the current dominant direction to avoid any bi-directional collisions
 *      (eg. vertical or horizontal).
 * 3.5. Commits the movement to the callback if valid.
 * 4. Wraps the move tracker with an event adapter (eg.: touch or mouse).
 * 5. Initiates the beginning of the user interaction for each event type.
 * 6. Closes the current interaction/movement.
 * 6.1. Removes the movement event listener.
 * 6.2. Escapes the function if the movement has already been closed.
 * 6.3. Extracts the latest move data and deletes the information from memory.
 * 6.4. Commits a swipe (top, left, right, bottom) if valid or cancels the movement
 *      (back to initial position).
 * 6.5. Erase the remaining movement states.
 * 7. Attaches the event listener to the document.
 * 8. Removes the event listener to the document on cleanup.
 * 
 * @example: ```
 *     useSwipes({
 *         onMove: ({ deltaY }) => setTranslateY(deltaY),
 *         onSwipeUp: () => slideDown(),
 *         onSwipeDown: () => slideUp(),
 *         ref: elementRef
 *     })
 *     ...
 *     <MyComponent ref={elementRef} />
 * ```
 */
export const useSwipes = (
    {
        onSwipeUp,
        onSwipeLeft,
        onSwipeRight,
        onSwipeDown,
        onComplete,
        onCancel,
        onMove,
        thresholdSwipe = 50,
        thresholdDirectionLock = 20,
        ref: elementRef,
    }: SwipeConfig,
    dependencies = [],
) => {
    /* [1] */
    const isVertical = !!(onSwipeUp || onSwipeDown)
    const isHorizontal = !!(onSwipeLeft || onSwipeRight)
    const isBothDirections = isVertical && isHorizontal

    useEffect(() => {
        if (!elementRef.current) {
            return
        }

        /* [2] */
        let start = {} as { x: number, y: number }
        let latestMove = null as SwipeSyntheticEvent | null
        let isMoveVerticalLocked = false as boolean
        let isMoveHorizontalLocked = false as boolean

        /* [3] */
        const trackMoves = ({ clientX, clientY }: { clientX: number, clientY: number }) => {
            /* [3.1] */
            const deltaX = clientX - start.x
            const deltaY = clientY - start.y

            /* [3.2] */
            const swipeSyntheticEvent = {
                x: clientX,
                y: clientY,
                deltaX,
                deltaY,
            }

            latestMove = swipeSyntheticEvent

            /* [3.3] */
            const isDirectionLocked = isMoveVerticalLocked || isMoveHorizontalLocked
            const isMoveVerticalAttempted = Math.abs(deltaY) > Math.abs(deltaX)
            const isMoveHorizontalAttempted = !isMoveVerticalAttempted
            const isMoveVerticalConfirmed = isVertical && isMoveVerticalAttempted && !isMoveHorizontalLocked
            const isMoveHorizontalConfirmed = isHorizontal && isMoveHorizontalAttempted && !isMoveVerticalLocked

            /* [3.4] */
            if (!isDirectionLocked && (Math.max(Math.abs(deltaY), Math.abs(deltaX)) > thresholdDirectionLock)) {
                if (isMoveVerticalAttempted) {
                    isMoveVerticalLocked = true
                } else {
                    isMoveHorizontalLocked = true
                }
            }

            /* [3.5] */
            if (isBothDirections || isMoveVerticalConfirmed || isMoveHorizontalConfirmed) {
                onMove?.(swipeSyntheticEvent)
            }
        }

        /* [4] */
        const trackMouseMoves = ({ clientX, clientY }: MouseEvent) => trackMoves({ clientX, clientY })
        const trackTouchMoves = ({ touches }: TouchEvent) => trackMoves({ clientX: touches[0].clientX, clientY: touches[0].clientY })

        /* [5] */
        const trackTouch = (e: TouchEvent) => {
            start.x = e.touches[0].clientX
            start.y = e.touches[0].clientY
            elementRef.current?.addEventListener('touchmove', trackTouchMoves)
        }

        const trackMouse = (e: MouseEvent) => {
            start.x = e.clientX
            start.y = e.clientY
            elementRef.current?.addEventListener('mousemove', trackMouseMoves)
        }

        /* [6] */
        const ignoreMoves = (e: TouchEvent | MouseEvent) => {
            /* [6.1] */
            elementRef.current?.removeEventListener('touchmove', trackTouchMoves)
            elementRef.current?.removeEventListener('mousemove', trackMouseMoves)

            /* [6.2] */
            if (!latestMove) {
                return
            }

            /* [6.3] */
            const { deltaX, deltaY } = latestMove
            latestMove = null

            /* [6.4] */
            if (isHorizontal && !isMoveVerticalLocked && (Math.abs(deltaX) > thresholdSwipe)) {
                deltaX > 0 ? onSwipeRight?.() : onSwipeLeft?.()
                onComplete?.()
            } else if (isVertical && !isMoveHorizontalLocked && (Math.abs(deltaY) > thresholdSwipe)) {
                deltaY > 0 ? onSwipeDown?.() : onSwipeUp?.()
                onComplete?.()
            } else {
                onCancel?.()
            }

            /* [6.5] */
            isMoveVerticalLocked = false
            isMoveHorizontalLocked = false
        }

        /* [7] */
        elementRef.current.addEventListener('touchstart', trackTouch)
        elementRef.current.addEventListener('mousedown', trackMouse)
        window.addEventListener('touchend', ignoreMoves, true)
        window.addEventListener('mouseup', ignoreMoves, true)
        window.addEventListener('contextmenu', ignoreMoves, true)

        /* [8] */
        return () => {
            elementRef.current?.removeEventListener('touchstart', trackTouch)
            elementRef.current?.removeEventListener('mousedown', trackMouse)
            window.removeEventListener('touchend', ignoreMoves, true)
            window.removeEventListener('mouseup', ignoreMoves, true)
            window.removeEventListener('contextmenu', ignoreMoves, true)
        }
    }, dependencies)
}