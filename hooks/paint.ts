import { RefObject, useState, useLayoutEffect, useEffect } from 'react'

import { requestNextAnimationFrame } from '@/helpers/browser'
import { useViewport } from '@/hooks/events'

/* ========================================================================= */
/* Marquees */
/* ========================================================================= */

/**
 * Generates a shadow onto the reference.
 * 1. Plugs the layout hook only on the frontend side as it should not be
 *    triggered server side.
 * 2. Generates a shadow repeated to fill in 10x the screen width.
 * 3. Forces the recalculation of the shadows when the font changes on screen.
 */
export const useMarquee = ({ ref, duplicationFactor, durationEdgeToEdge }: { ref: RefObject<HTMLElement>, duplicationFactor: number, durationEdgeToEdge: number }) => {
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

            const width = ref.current?.offsetWidth
            const ratio = width / viewportWidth
            const multiplicator = ratio >= 1 ? ratio : Math.ceil((1 - ratio) * 10);
            const duplicationShadow = Math.ceil(multiplicator * duplicationFactor) + 1
            const finalDuration = durationEdgeToEdge * duplicationFactor * ratio

            let _shadow = ''

            if (width === 0) {
                return
            }

            for (var i = 0; i < duplicationShadow; i++) {
                _shadow += (i === 0 ? '' : ', ') + `${width * (i + 1)}px 0 0 currentColor` /* [2] */
            }

            setShadow(_shadow)
            setDuration(finalDuration)
        }, [ viewportWidth, isFontLoaded, duplicationFactor, durationEdgeToEdge ])
    }

    /* [3] */
    useEffect(() => {
        (document as any).fonts?.ready?.then?.(() => {
            requestNextAnimationFrame(() => setIsFontLoaded(true))
        })
    }, [])
    
    return {
        shadow,
        duration,
    }
}