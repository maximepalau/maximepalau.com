import React, { FunctionComponent, useRef } from 'react'

import { useVisibility, useBreakpoint } from '@/hooks/events'
import { useMarquee } from '@/hooks/paint'

import styles from './styles/closing-note.module.scss'

/* ========================================================================= */
/* Type(s) */
/* ========================================================================= */

type ClosingNoteProps =  {
    text: string
}

/* ========================================================================= */
/* Component(s) */
/* ========================================================================= */

const ClosingNote: FunctionComponent<ClosingNoteProps> = ({ text }) => {
    const containerRef = useRef(null)
    const sentenceRef = useRef(null)
    const isVisible = useVisibility(containerRef)
    const breakpoint = useBreakpoint([ 'main', 's', 'm' ], 'main')
    const durations = { main: 5000, s: 10000, m: 15000 };
    const { shadow, duration } = useMarquee({
        ref: sentenceRef,
        duplicationFactor: 10,
        durationEdgeToEdge: breakpoint ? durations[breakpoint] : 0,
    });

    return (
        <div
            className={styles.container}
            ref={containerRef}>
            <span
                className={`${styles.sentence} ${duration ? styles.sentenceIsAnimated : ''} type-style-7 uppercase`}
                ref={sentenceRef}
                style={{
                    textShadow: shadow,
                    animationDuration: `${duration / 1000}s`,
                    animationPlayState: isVisible ? 'running' : 'paused'
                }}>
                {text}
            </span>
        </div>
    )
}

/* ========================================================================= */
/* Export(s) */
/* ========================================================================= */

export default ClosingNote