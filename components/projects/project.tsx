import React, { FunctionComponent, useEffect, useState } from 'react'
import BlockContent from '@sanity/block-content-to-react'

import { Project as ProjectType } from '@/types/cms'

import { isMedia } from '@/helpers/browser'
import { useBreakpoint, useDimensions } from '@/hooks/events'
import ArrowLink from '@/components/triggers/arrow-link'
import ProjectExcerpt from './project-excerpt'

import styles from './styles/project.module.scss'

/* ========================================================================= */
/* Type(s) */
/* ========================================================================= */

type ProjectProps = ProjectType

/* ========================================================================= */
/* Component(s) */
/* ========================================================================= */

/**
 * 1. If the user is sensible to animations, let’s just open the projects
 *    straight away to avoid any painful transitions.
 */
const Project: FunctionComponent<ProjectProps> = props => {
    const { client, descriptionRaw, missions, projectUrl, technologies, title } = props

    const [ isOpen, setIsOpen ] = useState(false)
    const [ hasStylesCleared, setHasStylesCleared ] = useState(false)

    const { dimensions: containerDimensions, ref: containerRef } = useDimensions()
    const { dimensions: titleDimensions, ref: titleRef } = useDimensions()
    const breakpoint = useBreakpoint([ 'main', 'm' ], 'main')

    /* [1] */
    useEffect(() => {
        const hasReducedMotion = isMedia('(prefers-reduced-motion: reduce)')
        hasReducedMotion && setIsOpen(true)
    }, [])

    if (!isOpen && breakpoint === 'main') {
        return (
            <ProjectExcerpt
                onClick={() => setIsOpen(true)}
                {...props} />
        )
    }

    const containerStyles = !hasStylesCleared && containerDimensions?.height && titleDimensions?.height
        ? { maxHeight: isOpen ? `${containerDimensions.height}px` : `calc(${titleDimensions.height}px - 1.2rem)` }
        : undefined;
    
    return (
        <div
            className={`${styles.container} ${isOpen ? styles.containerIsOpen : ''}`}
            onFocusCapture={() => setIsOpen(true)}
            onTransitionEnd={e => e.propertyName === 'max-height' && isOpen && setHasStylesCleared(true)}
            style={containerStyles}
            tabIndex={-1}>
            <article
                aria-live='polite'
                className={`${styles.containerContent}`}
                ref={containerRef}>
                <header>
                    {/* Title */}
                    <h3
                        className={`${styles.title} type-style-2 uppercase`}
                        ref={titleRef}>
                        <span className={`${styles.titleInner}`}>
                            {title}
                        </span>
                    </h3>

                    <dl className={`${styles.meta} type-style-7`}>
                        {/* Mission(s) */}
                        {missions && (
                            <div className={`${styles.metaItem}`}>
                                <dt className={`${styles.metaKey}`}>Mission:</dt>
                                <dd className={`${styles.metaValue}`}>{missions}</dd>
                            </div>
                        )}

                        {/* Technologie(s) */}
                        {technologies?.length > 0 && (
                            <div className={`${styles.metaItem}`}>
                                <dt className={`${styles.metaKey}`}>Tech.:</dt>
                                <dd className={`${styles.metaValue}`}>{technologies.map(({ title }) => title).join(', ')}</dd>
                            </div>
                        )}

                        {/* Client(s) */}
                        {client?.title && (
                            <div className={`${styles.metaItem}`}>
                                <dt className={`${styles.metaKey}`}>Client:</dt>
                                <dd className={`${styles.metaValue}`}>{client.title}</dd>
                            </div>
                        )}
                    </dl>
                </header>

                {/* Description */}
                {descriptionRaw && (
                    <div className={`${styles.text} type-style-6 rich-text`}>
                        <BlockContent blocks={descriptionRaw} />
                    </div>
                )}

                {/* Link */}
                {projectUrl && (
                    <div className={`${styles.linkWrapper}`}>
                        <ArrowLink href={projectUrl}>
                            Visit the website
                        </ArrowLink>
                    </div>
                )}
            </article>
        </div>
    )
}

/* ========================================================================= */
/* Export(s) */
/* ========================================================================= */

export default Project