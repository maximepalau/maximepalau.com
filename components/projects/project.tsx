import React, { FunctionComponent } from 'react'
import BlockContent from '@sanity/block-content-to-react'

import { Project as ProjectType } from '@/types/cms'

/* ========================================================================= */
/* Type(s) */
/* ========================================================================= */

type ProjectProps = ProjectType & {}

/* ========================================================================= */
/* Component(s) */
/* ========================================================================= */

const Project: FunctionComponent<ProjectProps> = ({ client, descriptionRaw, missions, projectUrl, technologies, title }) => {

    return (
        <article>
            <header>
                {/* Title */}
               <h3>
                   {title}
               </h3>

               <dl>
                    {/* Mission(s) */}
                    {missions && (
                        <div>
                            <dt>Mission:</dt>
                            <dd>{missions}</dd>
                        </div>
                    )}

                    {/* Technologie(s) */}
                    {technologies?.length > 0 && (
                        <div>
                            <dt>Tech.:</dt>
                            <dd>{technologies.map(({ title }) => title).join(', ')}</dd>
                        </div>
                    )}

                    {/* Client(s) */}
                    {client?.title && (
                        <div>
                            <dt>Client:</dt>
                            <dd>{client.title}</dd>
                        </div>
                    )}
               </dl>
            </header>

            {/* Description */}
            {descriptionRaw && (
                <BlockContent blocks={descriptionRaw} />
            )}

            {/* Link */}
            {projectUrl && (
                <a href={projectUrl}>Visit the website</a>
            )}
        </article>
    )
}

/* ========================================================================= */
/* Export(s) */
/* ========================================================================= */

export default Project