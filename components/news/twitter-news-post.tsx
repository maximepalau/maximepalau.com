import React, { FunctionComponent } from 'react'
import BlockContent from '@sanity/block-content-to-react'

import { TwitterNewsPost as TwitterNewsPostType } from '@/types/cms'

import ArrowLink from '@/components/triggers/arrow-link'

import styles from './styles/news-post.module.scss'

/* ========================================================================= */
/* Type(s) */
/* ========================================================================= */

type TwitterNewsPostProps = TwitterNewsPostType & {}

/* ========================================================================= */
/* Component(s) */
/* ========================================================================= */

const TwitterNewsPost: FunctionComponent<TwitterNewsPostProps> = ({ surtitle, textRaw, url }) => {

    return (
        <article className={`${styles.container} expand-interaction scope-hover`}>
            {/* Surtitle */}
            {surtitle && (
                <header className={`${styles.surtitle} type-style-7`}>{surtitle}</header>
            )}

            {/* Text */}
            <div className={`${styles.text} type-style-5 twitter-rich-text`}>
                <BlockContent blocks={textRaw} />
            </div>

            {/* Link */}
            <ArrowLink
                className={`${styles.action} ${styles.twitterAction} expand-interaction__action type-style-7`}
                href={url}>
                See more on Twitter
            </ArrowLink>
        </article>
    )
}

/* ========================================================================= */
/* Export(s) */
/* ========================================================================= */

export default TwitterNewsPost