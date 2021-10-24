import React, { FunctionComponent } from 'react'

import GithubIcon from '@/components/icons/github-icon'
import GithubTreeIcon from '@/components/icons/github-tree-icon'
import Button from '@/components/triggers/button'

import styles from './styles/github-promotional-banner.module.scss'

/* ========================================================================= */
/* Type(s) */
/* ========================================================================= */

type GithubPromotionalBannerProps = {
    heading: string
    text: string
    linkLabel: string
    linkUrl: string
}

/* ========================================================================= */
/* Component(s) */
/* ========================================================================= */

const GithubPromotionalBanner: FunctionComponent<GithubPromotionalBannerProps> = ({ heading, text, linkLabel, linkUrl }) => {

    return (
        <article className={`${styles.container} inverted-text-color inverted-background-color`}>
            {/* Heading */}
            <h3 className={`${styles.heading}`}>
                <GithubIcon className={`${styles.headingIcon}`} />
                <span className={`${styles.headingContent} type-style-6 uppercase`}>
                    {heading}
                </span>
            </h3>

            {/* Text */}
            <p className={`${styles.text} type-style-4`}>
                {text}
            </p>

            {/* Button */}
            <Button
                as='a'
                href={linkUrl}
                target='_blank'
                rel='noopener'
                className={`${styles.action}`}
                variant='outline-arrow'>
                {linkLabel}
            </Button>

            {/* Illustration */}
            <GithubTreeIcon className={`${styles.illustration}`} />
        </article>
    )
}

/* ========================================================================= */
/* Export(s) */
/* ========================================================================= */

export default GithubPromotionalBanner