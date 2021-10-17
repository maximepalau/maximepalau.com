import React, { FunctionComponent } from 'react'

import {
    ExternalResourceNewsPost as ExternalResourceNewsPostType,
} from '@/types/cms'

import ArrowLink from '@/components/triggers/arrow-link'

import styles from './styles/news-post.module.scss'

/* ========================================================================= */
/* Type(s) */
/* ========================================================================= */

type ExternalResourceNewsPostProps = ExternalResourceNewsPostType

/* ========================================================================= */
/* Component(s) */
/* ========================================================================= */

const ExternalResourceNewsPost: FunctionComponent<ExternalResourceNewsPostProps> = ({ surtitle, heading, teaserText, resourceUrl }) => {

    return (
        <article className={`${styles.container} expand-interaction scope-hover`}>
            {/* Surtitle */}
            {surtitle && (
                <header className={`${styles.surtitle} type-style-7`}>{surtitle}</header>
            )}

            {/* Heading */}
            <h3 className={`${styles.text} type-style-4`}>
                <a
                    className='expand-interaction__action'
                    href={resourceUrl}
                    rel='noopener'
                    target='_blank'>
                    {heading}
                </a>
            </h3>

            {/* Text */}
            {teaserText && (
                <p className={`${styles.description} type-style-7`}>{teaserText}</p>
            )}

            {/* Action */}
            <ArrowLink
                aria-hidden='true'
                as='div'
                className={`${styles.action} type-style-7`}>
                Read more
            </ArrowLink>
        </article>
    )
}

/* ========================================================================= */
/* Export(s) */
/* ========================================================================= */

export default ExternalResourceNewsPost