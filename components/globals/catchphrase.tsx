import React, { FunctionComponent, ReactNode, RefObject, useState, useLayoutEffect, useRef, useEffect } from 'react'

import { Catchphrase as CatchphraseType } from '@/types/cms'

import { requestNextAnimationFrame } from '@/helpers/browser'
import { useVisibility, useViewport, useBreakpoint } from '@/hooks/events'
import CursorTrackerArea from '@/components/base/cursor-tracker-area'
import ArrowRightIcon from '@/components/icons/arrow-right-icon'

import styles from './styles/catchphrase.module.scss'

/* ========================================================================= */
/* Type(s) */
/* ========================================================================= */

type CatchphraseProps = CatchphraseType & {
    isReverted: boolean
}

/* ========================================================================= */
/* Function(s) & hook(s) */
/* ========================================================================= */

/**
 * Generates a shadow onto the reference.
 * 1. Plugs the layout hook only on the frontend side as it should not be
 *    triggered server side.
 * 2. Generates a shadow repeated to fill in 10x the screen width.
 * 3. Forces the recalculation of the shadows when the font changes on screen.
 */
const useMarquee = ({ ref, duplicationFactor, durationEdgeToEdge }: { ref: RefObject<HTMLElement>, duplicationFactor: number, durationEdgeToEdge: number }) => {
    const isBrowser = typeof window !== 'undefined'
    const [ isFontLoaded, setIsFontLoaded ] = useState(false)
    const [ shadow, setShadow ] = useState('')
    const [ duration, setDuration ] = useState(0)
    const { width: viewportWidth } = useViewport()

    /* [1] */
    if (isBrowser) {
        useLayoutEffect(() => {
            if (!ref.current || !viewportWidth) {
                return
            }

            const durationWithDuplicator = durationEdgeToEdge * duplicationFactor
            const width = ref.current?.offsetWidth
            const ratio = width / viewportWidth
            const duplicationShadow = Math.ceil(ratio * duplicationFactor) + 1
            const _duration = durationWithDuplicator * ratio

            let _shadow = ''

            if (width === 0) {
                return
            }

            for (var i = 0; i < duplicationShadow; i++) {
                _shadow += (i === 0 ? '' : ', ') + `${width * (i + 1)}px 0 0 currentColor` /* [2] */
            }

            setShadow(_shadow)
            setDuration(_duration)
        }, [ viewportWidth, isFontLoaded, duplicationFactor, durationEdgeToEdge ])
    }

    /* [3] */
    useEffect(() => {
        document.fonts?.ready?.then?.(() => {
            requestNextAnimationFrame(() => setIsFontLoaded(true))
        })
    }, [])
    
    return {
        shadow,
        duration,
    }
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
                isEnabled={breakpoint !== 'main'}
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