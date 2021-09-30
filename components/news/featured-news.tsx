import React, { FunctionComponent } from 'react'

import {
    ArticleNewsPost as ArticleNewsPostType,
    ProjectNewsPost as ProjectNewsPostType,
    TwitterNewsPost as TwitterNewsPostType,
    ExternalResourceNewsPost as ExternalResourceNewsPostType,
} from '@/types/cms'
import ArticleNewsPost from './article-news-post'
import ExternalResourceNewsPost from './external-resource-news-post'
import ProjectNewsPost from './project-news-post'
import TwitterNewsPost from './twitter-news-post'

/* ========================================================================= */
/* Type(s) */
/* ========================================================================= */

type FeaturedNewsProps = {
    posts: (TwitterNewsPostType | ProjectNewsPostType | ArticleNewsPostType | ExternalResourceNewsPostType)[]
}

/* ========================================================================= */
/* Component(s) */
/* ========================================================================= */

const FeaturedNews: FunctionComponent<FeaturedNewsProps> = ({ posts }) => {
    return (
        <>
            {posts.map((post, idx) => {
                switch (post.__typename) {
                    case 'ArticleNewsPost':
                        return <ArticleNewsPost {...post} key={`featured-news-${idx}`} />
                    case 'ExternalResourceNewsPost':
                        return <ExternalResourceNewsPost {...post} key={`featured-news-${idx}`} />
                    case 'ProjectNewsPost':
                        return <ProjectNewsPost {...post} key={`featured-news-${idx}`} />
                    case 'TwitterNewsPost':
                        return <TwitterNewsPost {...post} key={`featured-news-${idx}`} />
                }
            })}
        </>
    )
}

/* ========================================================================= */
/* Export(s) */
/* ========================================================================= */

export default FeaturedNews