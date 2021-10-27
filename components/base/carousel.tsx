import React, { FunctionComponent, ComponentPropsWithoutRef, useState, createContext, useContext, useRef, useEffect } from 'react'

import { requestNextAnimationFrame } from '@/helpers/browser'
import { useLazyEffect } from '@/hooks/lifecycle'
import { useKeyboard, useSwipes } from '@/hooks/events'

import styles from './styles/carousel.module.scss'

/* ========================================================================= */
/* Types */
/* ========================================================================= */

type CarouselProps = {
    id: string
    initialIndex?: number
    label: string
    total: number
    autoplayTime?: number
    transitionTime?: number
} & ComponentPropsWithoutRef<'section'>

type CarouselTrackProps = ComponentPropsWithoutRef<'div'>

type CarouselSlideProps = {
    index: number
    label?: string | null
} & ComponentPropsWithoutRef<'div'>

type CarouselPrevButtonProps = ComponentPropsWithoutRef<'button'>

type CarouselNextButtonProps = ComponentPropsWithoutRef<'button'>

type CarouselPaginationProps = ComponentPropsWithoutRef<'div'>

type CarouselProgressProps = ComponentPropsWithoutRef<'div'>

type CarouselContextType = {
    ids: {
        module: string
        track: string
    }
    index: number
    setIndex: (i: number) => boolean
    decrement: () => void
    increment: () => void
    total: number
    isSliding: boolean
    setIsSliding: (i: boolean) => void
    isGrabbing: boolean
    setIsGrabbing: (i: boolean) => void
    isPaused: boolean
    setIsPaused: (i: boolean) => void
    autoplayTime: number
    transitionTime: number
    enqueueAutoplay: () => boolean
    dequeueAutoplay: () => boolean
}

type Timer = {
    enqueue: () => boolean
    dequeue: () => boolean
    pause: () => boolean
    resume: () => boolean
}

/* ========================================================================= */
/* Functions */
/* ========================================================================= */

/**
 * Utility function providing a basic timer logic used to manage the autoplay.
 * 1. The enqueue function registers the callback to be called in X seconds.
 * 2. The dequeue function unregisters the callback from the event loop.
 * 3. The pause function unregisters the callback but saves it to be resumed later on.
 * 4. The resume function registers the previously saved callback.
 */
const generateTimer = (time: number | undefined, callback: () => void): Timer => {
    let timeoutId = null as number | null
    let requestedTime = null as number | null
    let remainingTime = null as number | null

    /* [1] */
    const enqueue = (duration = time) => {
        if (!time) return false
        remainingTime = null
        requestedTime = Date.now()
        timeoutId = setTimeout(() => callback(), duration)
        return true
    }

    /* [2] */
    const dequeue = () => {
        if (!time || !timeoutId) return false
        clearTimeout(timeoutId)
        timeoutId = null
        requestedTime = null
        return true
    }

    /* [3] */
    const pause = () => {
        if (!requestedTime || !time) return false
        remainingTime = requestedTime + time - Date.now()
        return dequeue()
    }

    /* [4] */
    const resume = () => {
        if (!remainingTime) return false
        return enqueue(remainingTime)
    }

    return {
        enqueue,
        dequeue,
        pause,
        resume,
    }
}

/* ========================================================================= */
/* Hooks */
/* ========================================================================= */

const CarouselContext = createContext<Partial<CarouselContextType>>({})

/**
 * Provides an interface to generate an index with a looping behaviour
 * (the index is reset to the lower or upper limit when reaching the threshold).
 */
const useLoopingIndex = (
    { initialIndex, total, onChange }: { initialIndex: number, total: number, onChange: (i: number) => void }
) => {
    const safeInitialIndex = Math.min(Math.max(initialIndex, 0), total - 1)
    const [ index, setIndex ] = useState(safeInitialIndex)

    const decrement = () => {
        const newIndex = index - 1
        const newValidIndex = newIndex < 0 ? total - 1 : newIndex
        setIndex(newValidIndex)
        onChange?.(newValidIndex)
    }

    const increment = () => {        
        const newIndex = index + 1
        const newValidIndex = newIndex >= total ? 0 : newIndex
        setIndex(newValidIndex)
        onChange?.(newValidIndex)
    }

    return { index, decrement, increment }
}

/* ========================================================================= */
/* Component */
/* ========================================================================= */

/**
 * This module implements the ARIA guidelines available at the following URL:
 * https://www.w3.org/TR/wai-aria-practices-1.1/examples/carousel/carousel-1.html
 * 1. Interface to manage the current active index (with infinite looping behaviour).
 * 2. Registers the keyboard event handlers.
 * 4. Context shared accross the compound components.
 * 
 * @example: ```
 *     <Carousel {...}>
 *         <CarouselPrevButton>...</CarouselPrevButton>
 *         <CarouselNextButton>...</CarouselNextButton>
 *         <CarouselPagination />
 *         <CarouselTrack>
 *             <CarouselSlide>...</CarouselSlide>
 *         </CarouselTrack>
 *         <CarouselProgress />
 *     </Carousel>
 * ```
 */
const Carousel: FunctionComponent<CarouselProps> = ({
    id,
    initialIndex = 0,
    label,
    total,
    autoplayTime,
    transitionTime = 350,
    className = '',
    ...remainingProps
}) => {
    const [ isSliding, setIsSliding ] = useState(false)
    const [ isGrabbing, setIsGrabbing ] = useState(false)
    const [ isPaused, setIsPaused ] = useState(false)

    /* [1] */
    const { index, decrement, increment } = useLoopingIndex({
        initialIndex,
        total,
        onChange: () => setIsSliding(true),
    })

    /* [2] */
    useKeyboard({
        'ArrowLeft': () => decrement(),
        'ArrowRight': () => increment(),
    })

    const ids = { module: id, track: id + '-track' }

    /* [3] */
    const context = {
        ids,
        index,
        decrement,
        increment,
        total: total,
        isSliding,
        setIsSliding,
        isGrabbing,
        setIsGrabbing,
        isPaused,
        setIsPaused,
        autoplayTime: autoplayTime || 0,
        transitionTime: transitionTime || 0,
    }

    return (
        <CarouselContext.Provider value={context}>
            <section
                aria-label={label || ''}
                aria-roledescription='carousel'
                className={`${styles.carousel} ${className}`}
                id={ids.module}
                {...remainingProps} />
        </CarouselContext.Provider>
    )
}

/**
 * This component is responsible for tracking the user’s swiping behaviours
 * and adapts the view accordingly.
 * 1. Component references. The decrement/increment methods are registered
 *    in a reference so we can keep the swipe hook independant of the component
 *    lifecycle (performance optimisation).
 * 2. Tracks the user swipe events.
 * 3. If an autoplay timer is defined, adds the autplay to the component lifecycle.
 */
const CarouselTrack: FunctionComponent<CarouselTrackProps> = ({ className = '', ...remainingProps }) => {
    const { index, decrement, increment, ids, setIsSliding, isGrabbing, setIsGrabbing, isPaused, setIsPaused, autoplayTime, transitionTime } = useContext(CarouselContext)
    const [ deltaX, setDeltaX ] = useState(0)

    /* [1] */
    const trackRef = useRef<HTMLDivElement>(null)
    const trackInnerRef = useRef<HTMLDivElement>(null)
    const positionRef = useRef<({ decrement: (() => void) | undefined, increment: (() => void) | undefined }) | null>(null)
    positionRef.current = { decrement, increment }
    const autoplayRef = useRef<Timer | null>(null)

    /* [2] */
    useSwipes({
        onMove: ({ deltaX }) => {
            setDeltaX(deltaX)
            !isGrabbing && setIsGrabbing?.(true)
        },
        onComplete: () => (setDeltaX(0), setIsGrabbing?.(false)),
        onCancel: () => (setDeltaX(0), setIsGrabbing?.(false)),
        onSwipeLeft: () => positionRef.current?.increment?.(),
        onSwipeRight: () => positionRef.current?.decrement?.(),
        ref: trackRef,
    })

    /* [3] */
    if (autoplayTime && transitionTime) {
        useEffect(() => {
            const autoplay = generateTimer(
                autoplayTime + transitionTime,
                () => positionRef.current?.increment?.(),
            )

            autoplayRef.current = autoplay
            autoplay.enqueue()

            return () => void autoplay.dequeue()
        }, [])

        useLazyEffect(() => {
            autoplayRef.current?.enqueue()
        }, [ index ])

        useLazyEffect(() => {
            if (isGrabbing || isPaused) {
                autoplayRef.current?.pause()
            } else {
                autoplayRef.current?.resume()
            }
        }, [ isGrabbing, isPaused ])
    }

    return (
        <div style={{ maxWidth: '100%', overflow: 'hidden' }} ref={trackRef}>
            <div
                onMouseEnter={() => setIsPaused?.(true)}
                onMouseLeave={() => setIsPaused?.(false)}
                onTouchStart={() => setIsPaused?.(true)}
                onTouchEnd={() => setIsPaused?.(false)}
                onTouchCancel={() => setIsPaused?.(false)}
                style={{
                    transform: isGrabbing ? `translateX(${deltaX}px)` : 'translateX(0px)',
                    transition: isGrabbing ? '' : `transform ${(transitionTime || 0) / 1000}s ease-out`,
                }}>
                <div
                    aria-live='off'
                    className={`${styles.trackInner} ${className}`}
                    id={ids?.track}
                    onTransitionEnd={e => trackInnerRef.current?.id === ids?.track && e.propertyName === 'transform' && setIsSliding?.(false)}
                    ref={trackInnerRef}
                    style={{
                        transform: `translateX(calc(100% * -${(index ?? 0)}))`,
                        transition: `transform ${(transitionTime || 0) / 1000}s ease-out`,
                        pointerEvents: deltaX ? 'none' : 'auto',
                    }}
                    {...remainingProps} />
            </div>
        </div>
    )
}

const CarouselSlide: FunctionComponent<CarouselSlideProps> = ({ index, label, className = '', ...remainingProps }) => {
    const { index: activeIndex, total } = useContext(CarouselContext)

    return (
        <div
            aria-hidden={activeIndex === index ? 'false' : 'true'}
            aria-label={label || `${index + 1} of ${total}`}
            aria-roledescription='slide'
            className={`${styles.slide} ${className}`}
            inert={activeIndex === index ? undefined : ''}
            {...remainingProps} />
    )
}

const CarouselPrevButton: FunctionComponent<CarouselPrevButtonProps> = props => {
    const { decrement, ids } = useContext(CarouselContext)

    return (
        <button
            aria-controls={ids?.track}
            aria-label='Previous slide'
            onClick={() => decrement?.()}
            type='button'
            {...props} />
    )
}

const CarouselNextButton: FunctionComponent<CarouselNextButtonProps> = props => {
    const { increment, ids } = useContext(CarouselContext)

    return (
        <button
            aria-controls={ids?.track}
            aria-label='Next slide'
            onClick={() => increment?.()}
            type='button'
            {...props} />
    )
}

const CarouselPagination: FunctionComponent<CarouselPaginationProps> = props => {
    const { index, total } = useContext(CarouselContext)

    if (typeof index !== 'number') return null

    return (
        <div {...props}>
            {`${index + 1} / ${total}`}
        </div>
    )
}

/**
 * 1. Waits for the browser to update the view and resets the animation state
 *    (to force the relaunch of the CSS animation).
 */
const CarouselProgress: FunctionComponent<CarouselProgressProps> = ({ className = '', ...remainingProps }) => {
    const { index, isPaused, autoplayTime, transitionTime } = useContext(CarouselContext)
    const [ isAnimating, setIsAnimating ] = useState(true)
    

    if (!autoplayTime || !transitionTime) return null

    /* [1] */
    useLazyEffect(() => {
        setIsAnimating(false)
        requestNextAnimationFrame(() => setIsAnimating(true))
    }, [ index ])

    return (
        <div
            className={`${styles.progress} ${isAnimating ? styles.progressAnimating : ''} ${isPaused ? styles.progressPaused : ''} ${className}`}
            style={{ animationDuration: `${(autoplayTime + transitionTime) / 1000}s` }}
            {...remainingProps} />
    )
}

/* ========================================================================= */
/* Exports */
/* ========================================================================= */

export {
    Carousel,
    CarouselTrack,
    CarouselSlide,
    CarouselPrevButton,
    CarouselNextButton,
    CarouselPagination,
    CarouselProgress,
}