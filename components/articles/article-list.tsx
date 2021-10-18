import React, { FunctionComponent } from 'react'

import { Article as ArticleType } from '@/types/cms'
import Article from './article'

/* ========================================================================= */
/* Type(s) */
/* ========================================================================= */

type ArticleListProps = {
    posts: ArticleType[]
}

/* ========================================================================= */
/* Component(s) */
/* ========================================================================= */

const ArticleList: FunctionComponent<ArticleListProps> = ({ posts }) => {

    return (
        <ul>
            {posts.map(post => (
                <li key={`project-item-${post.id}`}>
                    <Article {...post} />
                </li>
            ))}
        </ul>
    )
}

/* ========================================================================= */
/* Export(s) */
/* ========================================================================= */

export default ArticleList