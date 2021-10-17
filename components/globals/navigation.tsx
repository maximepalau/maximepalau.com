import React, { FunctionComponent, useRef } from 'react'
import whatInput from 'what-input'

import { useDimensions } from '@/hooks/events'
import { useThemeContext } from '@/contexts/theme'
import BurgerIcon from '@/components/icons/burger-icon'
import CrossIcon from '@/components/icons/cross-icon'
import GithubIcon from '@/components/icons/github-icon'
import LinkedinIcon from '@/components/icons/linkedin-icon'
import TwitterIcon from '@/components/icons/twitter-icon'

import styles from './styles/navigation.module.scss'

/* ========================================================================= */
/* Function(s) */
/* ========================================================================= */

/**
 * Accessible smooth scroll helper taking into account the height of the navigation.
 */
const scrollToSection = ({ targetSelector, offset = 0 }: { targetSelector: string, offset?: number }) => {
    const target = document.querySelector(targetSelector) as HTMLElement

    if (target && whatInput.ask() === 'keyboard') {
        target?.focus()
    } else if (target) {
        window.scrollTo({
            top: target.offsetTop - offset,
            left: 0,
            behavior: 'smooth',
        })
    }
}

/* ========================================================================= */
/* Type(s) */
/* ========================================================================= */

type NavigationProps = {
    sections: {
        heading: string
        id: string
        isEnabled?: boolean
    }[]
    globals: {
        githubUrl?: string | null
        linkedinUrl?: string | null
        twitterUrl?: string | null
    }
}

/* ========================================================================= */
/* Component(s) */
/* ========================================================================= */

const Navigation: FunctionComponent<NavigationProps> = ({ sections, globals }) => {
    const openButtonRef = useRef<HTMLButtonElement>(null)
    const closeButtonRef = useRef<HTMLButtonElement>(null)
    const { dimensions, ref: navigationRef } = useDimensions()
    const themeContext = useThemeContext()

    return (
        <>
            <style>{`:root { --navigation-height: ${dimensions?.height || 0}px }`}</style>
            <nav
                aria-label='Page sections'
                className={`${styles.navigation} ${themeContext?.state?.activeMode === 'dark' ? 'dark-mode' : 'light-mode'} default-text-color default-background-color`}
                ref={navigationRef}>
                {/* Open button */}
                <button
                    aria-label='Open navigation'
                    className={`${styles.openButton}`}
                    onClick={() => closeButtonRef.current?.focus({ preventScroll: true })}
                    ref={openButtonRef}
                    tabIndex={-1}
                    type='button'>
                    <BurgerIcon />
                </button>

                {/* Modal (if mobile) */}
                <div className={styles.modal}>
                    <button
                        aria-label='Close navigation'
                        className={`${styles.closeButton}`}
                        onClick={() => openButtonRef.current?.focus({ preventScroll: true })}
                        ref={closeButtonRef}
                        tabIndex={-1}
                        type='button'>
                        <CrossIcon />
                    </button>
                    <ul className={`${styles.list} type-style-6 list-reset`}>
                        {sections.map((section) => section?.isEnabled && (
                            <li
                                className={`${styles.item}`}
                                key={'navigation-item-' + section.id}>
                                <a
                                    className={`${styles.link} hover-underline`}
                                    href={`#${section.id}`}
                                    onClick={e => {
                                        e.preventDefault()
                                        scrollToSection({ targetSelector: `#${section.id}`, offset: dimensions?.height })
                                    }}>
                                    {section.heading}
                                </a>
                            </li>
                        ))}
                    </ul>

                    {/* Social media */}
                    {(globals?.githubUrl || globals?.linkedinUrl || globals?.twitterUrl) && (
                        <address
                            aria-label='Social media'
                            className={styles.socialMedia}>
                            <p className={`${styles.socialMediaHeading} type-style-7`}>Find me on:</p>
                            <ul className={`${styles.socialMediaList} list-reset`}>
                                {/* Twitter */}
                                {globals.twitterUrl && (
                                    <li className={styles.socialMediaListItem}>
                                        <a
                                            aria-label='Twitter'
                                            href={globals.twitterUrl}>
                                            <TwitterIcon className={styles.socialMediaIcon} />
                                        </a>
                                    </li>
                                )}
                                {/* LinkedIn */}
                                {globals.linkedinUrl && (
                                    <li className={styles.socialMediaListItem}>
                                        <a
                                            aria-label='LinkedIn'
                                            href={globals.linkedinUrl}>
                                            <LinkedinIcon className={styles.socialMediaIcon} />
                                        </a>
                                    </li>
                                )}
                                {/* Github */}
                                {globals.githubUrl && (
                                    <li className={styles.socialMediaListItem}>
                                        <a
                                            aria-label='Github'
                                            href={globals.githubUrl}>
                                            <GithubIcon className={styles.socialMediaIcon} />
                                        </a>
                                    </li>
                                )}
                            </ul>
                        </address>
                    )}
                </div>
            </nav>
        </>
    )
}

/* ========================================================================= */
/* Export(s) */
/* ========================================================================= */

export default Navigation