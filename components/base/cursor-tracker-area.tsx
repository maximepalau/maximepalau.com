import React, { FunctionComponent, ReactNode, useState, useRef, useEffect, useLayoutEffect } from 'react'
import { throttle } from 'lodash'
import { requestNextAnimationFrame } from '@/helpers/browser'

/* ========================================================================= */
/* Types */
/* ========================================================================= */

type SyntheticMouseEvent = {
    x: number
    y: number
    isMoving: boolean
}

type CursorAreaProps = {
    renderCursorTracker: (e: SyntheticMouseEvent) => ReactNode
    isEnabled: boolean
    children: ReactNode
}

/* ========================================================================= */
/* Component(s) */
/* ========================================================================= */

/**
 * Provides an interface to display a moving UI device that tracks the user mouse.
 * 1. Prevents the initial move to be transitioned so the cursor tracker doesn’t jump.
 */
const CursorTrackerArea: FunctionComponent<CursorAreaProps> = ({ renderCursorTracker, isEnabled = true, children }) => {
    const isBrowser = typeof window !== 'undefined'
    const [ mousePosition, setMousePosition ] = useState({ x: 0, y: 0 })
    const [ isMoveInitialized, setIsMoveInitialized ] = useState(false)
    const [ isMoving, setIsMoving ] = useState(false)
    const areaRef = useRef<HTMLDivElement>(null)

    /* [1] */
    if (isBrowser) {
        useLayoutEffect(() => {
            if (!isMoveInitialized) return
            requestNextAnimationFrame(() => {
                setIsMoveInitialized(false)
                setIsMoving(true)
            })
        }, [ isMoveInitialized ])
    }

    useEffect(() => {
        if (!areaRef.current || !isEnabled) return

        const syncCursorPosition = throttle(({ clientX, clientY }: MouseEvent) => {
            return setMousePosition({ x: clientX, y: clientY })
        }, 100, { leading: true })

        const listenMouseMoves = ({ clientX, clientY }: MouseEvent) => {
            setMousePosition({ x: clientX, y: clientY })
            addEventListener('mousemove', syncCursorPosition)
            setIsMoveInitialized(true)
        }

        const ignoreMouseMoves = () => {
            removeEventListener('mousemove', syncCursorPosition)
            setTimeout(() => setIsMoving(false), 100)
        }

        areaRef.current.addEventListener('mouseenter', listenMouseMoves)
        areaRef.current.addEventListener('mouseleave', ignoreMouseMoves)

        return () => {
            ignoreMouseMoves()
            areaRef.current?.removeEventListener('mouseenter', listenMouseMoves)
            areaRef.current?.removeEventListener('mouseleave', ignoreMouseMoves)
        }
    }, [ isEnabled ])

    return (
        <div ref={areaRef}>
            {children}
            {renderCursorTracker({ ...mousePosition, isMoving })}
        </div>
    )
}

export default CursorTrackerArea