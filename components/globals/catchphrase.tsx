import React, { FunctionComponent, useRef } from 'react'

import { Catchphrase as CatchphraseType } from '@/types/cms'

import { useVisibility, useBreakpoint } from '@/hooks/events'
import { useMarquee } from '@/hooks/paint'
import CursorTrackerArea from '@/components/base/cursor-tracker-area'
import ArrowRightIcon from '@/components/icons/arrow-right-icon'

import styles from './styles/catchphrase.module.scss'

/* ========================================================================= */
/* Type(s) */
/* ========================================================================= */

type CatchphraseProps = CatchphraseType & {
    isReverted?: boolean
}

/* ========================================================================= */
/* Component(s) */
/* ========================================================================= */

const Catchphrase: FunctionComponent<CatchphraseProps> = ({ sentence, author, sourceUrl, isReverted = false }) => {
    const containerRef = useRef(null)
    const sentenceRef = useRef(null)
    const isVisible = useVisibility(containerRef)
    const breakpoint = useBreakpoint([ 'main', 's', 'm' ], 'main')
    const durations = { main: 2500, s: 5000, m: 7500 };
    const { shadow, duration } = useMarquee({
        ref: sentenceRef,
        duplicationFactor: 10,
        durationEdgeToEdge: breakpoint ? durations[breakpoint] : 0,
    });
    const authorColorClasses = isReverted ? 'default-text-color default-background-color' : 'inverted-text-color inverted-background-color'

    const content = (
        <div
            className={styles.container}
            ref={containerRef}>
            <blockquote
                cite={sourceUrl}
                className={`${styles.quote} type-style-1`}>
                <span
                    className={`${styles.sentence} ${duration ? styles.sentenceIsAnimated : ''}`}
                    ref={sentenceRef}
                    style={{
                        textShadow: shadow,
                        animationDuration: `${duration / 1000}s`,
                        animationPlayState: isVisible ? 'running' : 'paused'
                    }}>
                    {sentence}
                </span>
            </blockquote>
        </div>
    )

    if (!sourceUrl || !author) {
        return content
    }

    return (
        <a 
            href={sourceUrl}
            target='_blank'
            rel='noopener'>
            <CursorTrackerArea
                isEnabled={breakpoint === 'm'}
                renderCursorTracker={({ x, y, isMoving }) => (
                    <div
                        aria-hidden='true'
                        className={styles.cursorTracker}
                        style={{ transform: `translate(${x}px, ${y}px) translate(-50%, -80%)` }}>
                        <div className={`${styles.cursorTrackerAction} ${isMoving ? styles.cursorTrackerActionIsVisible : ''} ${authorColorClasses} type-style-7`}>
                            {author}
                            <ArrowRightIcon className={styles.cursorTrackerIcon} />
                        </div>
                    </div>
                )}>
                <figure>
                    {content}
                    {author && (
                        <figcaption className={`${styles.authorContainer} m-visually-hidden`}>
                            <div className={`${styles.author} ${authorColorClasses} type-style-7`}>
                                {author}
                                <ArrowRightIcon className={styles.authorIcon} />
                            </div>
                        </figcaption>
                    )}
                </figure>
            </CursorTrackerArea>
        </a>
    )
}

/* ========================================================================= */
/* Export(s) */
/* ========================================================================= */

export default Catchphrase