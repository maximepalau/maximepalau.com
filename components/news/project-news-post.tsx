import React, { FunctionComponent } from 'react'

import {
    ProjectNewsPost as ProjectNewsPostType,
} from '@/types/cms'

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
        <article>
            <header>
                {/* Surtitle */}
                {surtitle && (
                    <p>{surtitle}</p>
                )}

                {/* Heading */}
                <h3>
                    <a href={project.url}>
                        {heading}
                    </a>
                </h3>
            </header>

            {/* Author */}
            {teaserText && (
                <p>{teaserText}</p>
            )}
        </article>
    )
}

/* ========================================================================= */
/* Export(s) */
/* ========================================================================= */

export default ProjectNewsPost