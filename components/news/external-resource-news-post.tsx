import React, { FunctionComponent } from 'react'

import {
    ExternalResourceNewsPost as ExternalResourceNewsPostType,
} from '@/types/cms'

/* ========================================================================= */
/* Type(s) */
/* ========================================================================= */

type ExternalResourceNewsPostProps = ExternalResourceNewsPostType & {}

/* ========================================================================= */
/* Component(s) */
/* ========================================================================= */

const ExternalResourceNewsPost: FunctionComponent<ExternalResourceNewsPostProps> = ({ surtitle, heading, teaserText, resourceUrl }) => {

    return (
        <article>
            {/* Surtitle */}
            {surtitle && (
                <header>{surtitle}</header>
            )}

            {/* Heading */}
            <h3>
                <a href={resourceUrl}>
                    {heading}
                </a>
            </h3>

            {/* Text */}
            {teaserText && (
                <p>{teaserText}</p>
            )}
        </article>
    )
}

/* ========================================================================= */
/* Export(s) */
/* ========================================================================= */

export default ExternalResourceNewsPost