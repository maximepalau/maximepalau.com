import React, { FunctionComponent } from 'react'

import {
    ArticleNewsPost as ArticleNewsPostType,
} from '@/types/cms'

/* ========================================================================= */
/* Type(s) */
/* ========================================================================= */

type ArticleNewsPostProps = ArticleNewsPostType & {}

/* ========================================================================= */
/* Component(s) */
/* ========================================================================= */

const ArticleNewsPost: FunctionComponent<ArticleNewsPostProps> = ({ heading, surtitle, teaserText, article }) => {

    return (
        <article>
            <header>
                {/* Surtitle */}
                {surtitle && (
                    <p>{surtitle}</p>
                )}

                {/* Heading */}
                <h3>
                    <a href={article.url}>
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

export default ArticleNewsPost