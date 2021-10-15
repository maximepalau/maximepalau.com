import React, { FunctionComponent, ReactNode, useState, useRef, useEffect } from 'react'
import { throttle } from 'lodash'

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
 */
const CursorTrackerArea: FunctionComponent<CursorAreaProps> = ({ renderCursorTracker, isEnabled = true, children }) => {
    const [ mousePosition, setMousePosition ] = useState({ x: 0, y: 0 })
    const [ isMoving, setIsMoving ] = useState(false)
    const areaRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!areaRef.current || !isEnabled) return

        const syncCursorPosition = throttle(({ clientX, clientY }: MouseEvent) => {
            return setMousePosition({ x: clientX, y: clientY })
        }, 100, { leading: true })

        const listenMouseMoves = () => {
            addEventListener('mousemove', syncCursorPosition)
            setIsMoving(true)
        }

        const ignoreMouseMoves = () => {
            removeEventListener('mousemove', syncCursorPosition)
            setIsMoving(false)
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