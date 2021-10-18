import React, { FunctionComponent, ComponentPropsWithoutRef, useRef, useEffect } from 'react'

import { useThemeContext } from '@/contexts/theme'

import styles from './styles/page.module.scss'

/* ========================================================================= */
/* Type(s) */
/* ========================================================================= */

type PageProps = ComponentPropsWithoutRef<'div'>

type PageHeroProps = ComponentPropsWithoutRef<'header'>

type PageMainProps = ComponentPropsWithoutRef<'main'>

type PageSectionProps = {
    isDarkMode?: boolean
} & ComponentPropsWithoutRef<'section'>

type PageFooterProps = {
    isDarkMode?: boolean
} & ComponentPropsWithoutRef<'footer'>

/* ========================================================================= */
/* Component(s) */
/* ========================================================================= */

export const Page: FunctionComponent<PageProps> = props => {

    return (
        <>
            <a
                className={styles.skipLink}
                href='#page-content'>
                Skip to main content
            </a>
            <div {...props} />
        </>
    )
}

export const PageHero: FunctionComponent<PageHeroProps> = props => {

    return (
        <header {...props} />
    )
}

export const PageMain: FunctionComponent<PageMainProps> = props => {

    return (
        <main tabIndex={-1} id='page-content' {...props} />
    )
}

export const PageSection: FunctionComponent<PageSectionProps> = ({
    isDarkMode = false,
    className = '',
    ...remainingProps
}) => {
    const containerRef = useRef<HTMLElement>(null)
    const themeContext = useThemeContext()

    useEffect(() => {
        themeContext?.dispatch({
            type: 'registerArea',
            data: {
                ref: containerRef,
                mode: isDarkMode ? 'dark' : 'light'
            }
        })
    }, [])

    return (
        <section
            className={`${isDarkMode ? 'dark-mode' : ''} default-text-color default-background-color ${className}`}
            ref={containerRef}
            tabIndex={-1}
            {...remainingProps} />
    )
}

export const PageFooter: FunctionComponent<PageFooterProps> = ({
    isDarkMode = false,
    className,
    ...remainingProps
}) => {
    const containerRef = useRef<HTMLElement>(null)
    const themeContext = useThemeContext()

    useEffect(() => {
        themeContext?.dispatch({
            type: 'registerArea',
            data: {
                ref: containerRef,
                mode: isDarkMode ? 'dark' : 'light'
            }
        })
    }, [])

    return (
        <footer
            className={`${isDarkMode ? 'dark-mode' : ''} default-text-color default-background-color ${className}`}
            ref={containerRef}
            {...remainingProps} />
    )
}