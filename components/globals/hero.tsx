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
import ArrowDownIcon from '@/components/icons/arrow-down-icon'

import styles from './styles/hero.module.scss'

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
            {/* Left */}
            {/* <div className={styles.leftColumn}> */}
                {/* Brand */}
                <div className={styles.brand}>
                    <h1 className='type-style-7'>{heading}</h1>
                </div>

                {/* Introduction */}
                <div className={styles.introductionWrapper}>
                    <div className={`${styles.introduction} type-style-2 m-type-style-3`}>
                        <BlockContent blocks={introduction} />
                    </div>
                    <a
                        className={`${styles.scrollLink} scroll-link type-style-7`}
                        href='#page-content'>
                        Scroll down
                        <ArrowDownIcon className={`${styles.scrollLinkIcon} scroll-link__icon`} />
                    </a>
                </div>
            {/* </div> */}

            {/* Right */}
            {/* <div className={styles.rightColumn}> */}
                {/* News */}
                <div className={styles.news}>
                    <FeaturedNews posts={news} />
                </div>
            {/* </div> */}
        </div>
    )
}

/* ========================================================================= */
/* Export(s) */
/* ========================================================================= */

export default Hero