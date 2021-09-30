import React, { FunctionComponent } from 'react'
import BlockContent from '@sanity/block-content-to-react'

import { TwitterNewsPost as TwitterNewsPostType } from '@/types/cms'

/* ========================================================================= */
/* Type(s) */
/* ========================================================================= */

type TwitterNewsPostProps = TwitterNewsPostType & {}

/* ========================================================================= */
/* Component(s) */
/* ========================================================================= */

const TwitterNewsPost: FunctionComponent<TwitterNewsPostProps> = ({ surtitle, textRaw, url }) => {

    return (
        <article>
            {/* Surtitle */}
            {surtitle && (
                <header>{surtitle}</header>
            )}

            {/* Text */}
            <BlockContent blocks={textRaw} />

            {/* Link */}
            <a href={url}>
                See more on Twitter
            </a>
        </article>
    )
}

/* ========================================================================= */
/* Export(s) */
/* ========================================================================= */

export default TwitterNewsPost