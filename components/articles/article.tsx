import React, { FunctionComponent } from 'react'

import { Article as ArticleType } from '@/types/cms'

/* ========================================================================= */
/* Type(s) */
/* ========================================================================= */

type ArticleProps = ArticleType

/* ========================================================================= */
/* Component(s) */
/* ========================================================================= */

const Article: FunctionComponent<ArticleProps> = ({ title, publicationDate, technologies, articleUrl }) => {

    return (
        <article>
            {/* Title */}
            <h3>
                {title}
            </h3>

            <div>
                {/* Publication date */}
                <div>{publicationDate}</div>

                {/* Technologie(s) */}
                {technologies?.length > 0 && (
                    <div>
                        {technologies.map(({ title }) => title).join(', ')}
                    </div>
                )}
            </div>

            {/* Link */}
            {articleUrl && (
                <a href={articleUrl}>Read the article</a>
            )}
        </article>
    )
}

/* ========================================================================= */
/* Export(s) */
/* ========================================================================= */

export default Article