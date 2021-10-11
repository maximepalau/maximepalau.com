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

type NewsPostDispatcherProps = {
    post: TwitterNewsPostType | ProjectNewsPostType | ArticleNewsPostType | ExternalResourceNewsPostType
}

/* ========================================================================= */
/* Component(s) */
/* ========================================================================= */

const NewsPostDispatcher: FunctionComponent<NewsPostDispatcherProps> = ({ post }) => {
    switch (post.__typename) {
        case 'ArticleNewsPost':
            return <ArticleNewsPost {...post} />
        case 'ExternalResourceNewsPost':
            return <ExternalResourceNewsPost {...post} />
        case 'ProjectNewsPost':
            return <ProjectNewsPost {...post} />
        case 'TwitterNewsPost':
            return <TwitterNewsPost {...post} />
    }
}

/* ========================================================================= */
/* Export(s) */
/* ========================================================================= */

export default NewsPostDispatcher