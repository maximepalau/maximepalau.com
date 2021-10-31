import React, { FunctionComponent, ProviderProps, RefObject, Dispatch, useContext, useReducer, createContext, useEffect } from 'react'
import whatInput from 'what-input'
import { throttle } from 'lodash'

import { isMedia } from '@/helpers/browser'

/* ========================================================================= */
/* Function(s) */
/* ========================================================================= */

/**
 * Accessible smooth scroll implementation taking into account a possible offset
 * (eg.: the height of the navigation). If the user uses the keyboard, we skip
 * the animation and set the focus straight on the element (as the smooth scrolls)
 * break the native accessible behaviour.
 */
const scrollToTarget = ({ targetSelector, offset = 0 }: { targetSelector: string, offset?: number }) => {
    const target = document.querySelector(targetSelector) as HTMLElement
    const hasReducedMotion = isMedia('(prefers-reduced-motion: reduce)')

    if (target && (whatInput.ask() === 'keyboard' || hasReducedMotion)) {
        target?.focus()
        window.scrollTo({
            top: target.offsetTop + offset,
            left: 0,
        })
    } else if (target) {
        window.scrollTo({
            top: target.offsetTop + offset,
            left: 0,
            behavior: 'smooth',
        })
    }
}

/**
 * Hook used to plug the smooth scroll implementation to the page.
 */
const useSmoothScroll = ({ offset = 0 }: { offset?: number }) => {
    useEffect(() => {
        const overrideAnchorLinks = (e: Event) => {
            const target = e.target as HTMLAnchorElement
            const isAnchorLink = target.matches('a[href^="#"]')
            if (!isAnchorLink) return
            e.preventDefault()
            e.stopPropagation()
            scrollToTarget({ targetSelector: target.hash, offset })
        }

        addEventListener('click', overrideAnchorLinks, true)
        return () => removeEventListener('click', overrideAnchorLinks, true)
    }, [ offset ])
}

/* ========================================================================= */
/* Type(s) */
/* ========================================================================= */

type ModeType = 'light' | 'dark'

type ThemeStateType = {
    activeMode: ModeType,
    areas: {
        ref: RefObject<HTMLElement>
        mode: ModeType
    }[]
    scrollOffset: number
}

type ThemeActionType = {
    type: 'registerArea'
    data: {
        ref: RefObject<HTMLElement>
        mode: ModeType
    }
} | {
    type: 'changeMode'
    data: ModeType
} | {
    type: 'registerScrollOffset'
    data: number
}

type ThemeContextType = {
    state: ThemeStateType
    dispatch: Dispatch<ThemeActionType>
}

type ThemeProviderProps = Omit<ProviderProps<ThemeContextType>, 'value'>

/* ========================================================================= */
/* Context & reducer */
/* ========================================================================= */

const ThemeContext = createContext<ThemeContextType | null>(null)

const themeReducer = (state: ThemeStateType, action: ThemeActionType): ThemeStateType => {
    switch (action.type) {
    case 'registerArea':
        return {
            ...state,
            areas: state.areas.concat([{
                ref: action.data.ref,
                mode: action.data.mode,
            }]),
        }
    case 'changeMode':
        return {
            ...state,
            activeMode: action.data,
        }
    case 'registerScrollOffset':
        return {
            ...state,
            scrollOffset: action.data,
        }
    }
}

/* ========================================================================= */
/* Hook(s) & provider(s) */
/* ========================================================================= */

/**
 * Returns the cursor context object. To be used within the related provider.
 */
export const useThemeContext = () => {
    const context = useContext(ThemeContext)

    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider')
    }

    return context
}

/**
 * A provider component setting up the context of the custom cursor.
 * 1. Changes the active mode after each scroll (used to change the navigation colours).
 * 2. Plugs in a smooth scroll behaviour that takes into account screen readers.
 */
export const ThemeProvider: FunctionComponent<ThemeProviderProps> = props => {
    const [ state, dispatch ] = useReducer(themeReducer, {
        activeMode: 'light',
        areas: [],
        scrollOffset: 0,
    })

    /* [1] */
    useEffect(() => {
        const detectActiveSection =  throttle(() => {
            const activeSection = state.areas.find(({ ref }) => {
                const clientRect = ref.current?.getBoundingClientRect()
                const isTopPassed = ((clientRect?.top ?? 0) + state.scrollOffset) <= 0
                const isBottomUnreached = ((clientRect?.bottom ?? 0) + state.scrollOffset) > 0
                return clientRect && isTopPassed && isBottomUnreached
            })

            dispatch({ type: 'changeMode', data: activeSection?.mode || 'light' })
        }, 200, { trailing: true })

        addEventListener('scroll', detectActiveSection)
        return () => removeEventListener('scroll', detectActiveSection)
    }, [ state.areas, state.scrollOffset ])

    /* [2] */
    useSmoothScroll({ offset: state.scrollOffset })

    return (
        <ThemeContext.Provider
            value={{ state, dispatch }}
            {...props} />
    )
}