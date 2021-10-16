import React, { FunctionComponent } from 'react'

import {
    ProjectNewsPost as ProjectNewsPostType,
} from '@/types/cms'

import ArrowLink from '@/components/triggers/arrow-link'

import styles from './styles/news-post.module.scss'

/* ========================================================================= */
/* Type(s) */
/* ========================================================================= */

type ProjectNewsPostProps = ProjectNewsPostType & {}
export type ProjectNewsPost = {
    __typename: 'ProjectNewsPost'
    heading: string
    project: {
        url: string
        surtitle: string
        teaserText: string
    }
}

/* ========================================================================= */
/* Component(s) */
/* ========================================================================= */

const ProjectNewsPost: FunctionComponent<ProjectNewsPostProps> = ({ heading, surtitle, teaserText, project }) => {

    return (
        <article className={`${styles.container} expand-interaction scope-hover`}>
            <header>
                {/* Surtitle */}
                {surtitle && (
                    <p className={`${styles.surtitle} type-style-7`}>{surtitle}</p>
                )}

                {/* Heading */}
                <h3 className={`${styles.text} type-style-4`}>
                    <a
                        className='expand-interaction__action'
                        href={project.url}
                        rel='noopener'
                        target='_blank'>
                        {heading}
                    </a>
                </h3>
            </header>

            {/* Author */}
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

export default ProjectNewsPost