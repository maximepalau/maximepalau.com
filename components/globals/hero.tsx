import React, { FunctionComponent } from 'react'
import BlockContent from '@sanity/block-content-to-react'

import {
    ArticleNewsPost as ArticleNewsPostType,
    ProjectNewsPost as ProjectNewsPostType,
    TwitterNewsPost as TwitterNewsPostType,
    ExternalResourceNewsPost as ExternalResourceNewsPostType,
} from '@/types/cms'
import BlockContentType from '@/types/block-content'
import FeaturedNews from '@/components/news/featured-news'
import styles from './hero.module.scss'

/* ========================================================================= */
/* Type(s) */
/* ========================================================================= */

type HeroProps = {
    heading: string
    introduction: BlockContentType
    news: (ArticleNewsPostType | ProjectNewsPostType | TwitterNewsPostType | ExternalResourceNewsPostType)[]
}

/* ========================================================================= */
/* Component(s) */
/* ========================================================================= */

const Hero: FunctionComponent<HeroProps> = ({ heading, introduction, news }) => {

    return (
        <div className={styles.container}>
            <h1>{heading}</h1>
            <BlockContent blocks={introduction} />
            <FeaturedNews posts={news} />
        </div>
    )
}

/* ========================================================================= */
/* Export(s) */
/* ========================================================================= */

export default Hero