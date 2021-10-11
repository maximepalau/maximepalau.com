import { useEffect, useRef } from 'react'

/* ========================================================================= */
/* Side effects */
/* ========================================================================= */

/**
 * Implements a lazy version of React’s useEffect (skiping the first trigger on page load).
 */
export const useLazyEffect = (callback = () => {}, ...args: any[]) => {
    const isMountedRef = useRef(false)
    useEffect((...effectArgs) => void (isMountedRef.current && callback(...effectArgs)), ...args)
    useEffect(() => void (isMountedRef.current = true), [])

    return isMountedRef.current
}
