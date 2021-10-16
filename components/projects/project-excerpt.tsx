import React, { FunctionComponent } from 'react'

import { Project as ProjectType } from '@/types/cms'

import styles from './styles/project-excerpt.module.scss'

/* ========================================================================= */
/* Type(s) */
/* ========================================================================= */

type ProjectExcerptProps = ProjectType & {
    onClick: () => void
}

/* ========================================================================= */
/* Component(s) */
/* ========================================================================= */

const ProjectExcerpt: FunctionComponent<ProjectExcerptProps> = ({ missions, title, onClick }) => {

    return (
        <article
            aria-live='polite'
            className={`${styles.container} expand-interaction`}>
            {/* Title */}
            <h3 className={`${styles.title} type-style-2 uppercase`}>
                {title}
            </h3>

            <div className={`${styles.content}`}>
                {/* Mission(s) */}
                {missions && (
                    <p className={`${styles.meta} type-style-7`}>
                        <span className={`${styles.metaKey}`}>Mission:</span>
                        <span className={`${styles.metaValue}`}>{missions}</span>
                    </p>
                )}

                {/* Button */}
                <button
                    className={`${styles.button} button-reset expand-interaction__action`}
                    onClick={onClick}
                    type='button'>
                    See more +
                </button>
            </div>
        </article>
    )
}

/* ========================================================================= */
/* Export(s) */
/* ========================================================================= */

export default ProjectExcerpt