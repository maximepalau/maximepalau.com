import React, { RefObject, Dispatch, useContext, useReducer, createContext, useEffect } from 'react'
import { throttle } from 'lodash'

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
}

type ThemeContextType = {
    state: ThemeStateType
    dispatch: Dispatch<ThemeActionType>
}

/* ========================================================================= */
/* Context & reducer */
/* ========================================================================= */

const ThemeContext = createContext<ThemeContextType | null>(null)

const cursorReducer = (state: ThemeStateType, action: ThemeActionType): ThemeStateType => {
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
 */
export const ThemeProvider = ({ ...remainingProps }) => {
    const [ state, dispatch ] = useReducer(cursorReducer, {
        activeMode: 'light',
        areas: [],
    })

    /* [1] */
    useEffect(() => {
        const detectActiveSection =  throttle(() => {
            const activeSection = state.areas.find(({ ref }) => {
                const clientRect = ref.current?.getBoundingClientRect()
                return clientRect && clientRect.top <= 0 && clientRect.bottom > 0
            })
            dispatch({ type: 'changeMode', data: activeSection?.mode || 'light' })
            console.log(activeSection);
        }, 200, { trailing: true })
        addEventListener('scroll', detectActiveSection)
        return () => removeEventListener('scroll', detectActiveSection)
    }, [ state.areas ])

    return (
        <ThemeContext.Provider
            value={{ state, dispatch }}
            {...remainingProps} />
    )
}