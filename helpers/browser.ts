/* ========================================================================= */
/* Breakpoints */
/* ========================================================================= */

export type BreakpointType = 'main' | 'sm' | 's' | 'm' | 'l' | 'xl' | 'xxl'

export const breakpoints = {
    main: '0',
    xs: '31em',
    s: '44em',
    m: '60em',
    l: '69em',
    xl: '88em',
    xxl: '100em',
} as { [key: string]: string }

/**
 * Checks whether the current breakpoint matches the provided key.
 */
export const isMedia = (query: string): boolean => window.matchMedia(query).matches

/**
 * Checks whether the current breakpoint matches the provided key.
 */
export const isBreakpoint = (fromBreakpoint: BreakpointType, toBreakpoint: BreakpointType | null = null) => {
    [ fromBreakpoint, toBreakpoint ].forEach((breakpoint: BreakpointType | null) => {
        if (breakpoint && !breakpoints[breakpoint]) {
            console.warn(`The following breakpoint appears to be missing in the configuration: '${breakpoint}'.`)
        }
    })
    
    let mediaRule = `(min-width: ${breakpoints[fromBreakpoint]})`

    if (toBreakpoint) {
        mediaRule = `${mediaRule} and (max-width: ${breakpoints[toBreakpoint]})`
    }

    return window.matchMedia(mediaRule).matches
}

/**
 * Returns the current active breakpoint (based on the provided breakpoints,
 * or all of them if not specified).
 */
export const getBreakpoint = (_breakpoints: BreakpointType[]): BreakpointType | null => {
    const clonedBreakpoints = [ ...(_breakpoints || Object.keys(breakpoints)) ] as BreakpointType[]
    return clonedBreakpoints.reverse().find(breakpoint => isBreakpoint(breakpoint)) || null
}

/**
 * Returns the breakpoint size (in pixels).
 */
export const getBreakpointSize = (breakpoint: BreakpointType): number => parseInt(breakpoints[breakpoint])

/* ========================================================================= */
/* Rendering */
/* ========================================================================= */

/**
 * Ensures the callback is executed after at least one rendered frame.
 */
export const requestNextAnimationFrame = (callback: () => void) => {
    return requestAnimationFrame(() => requestAnimationFrame(callback))
}