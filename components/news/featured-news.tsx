import React, { FunctionComponent } from 'react'

import {
    ArticleNewsPost as ArticleNewsPostType,
    ProjectNewsPost as ProjectNewsPostType,
    TwitterNewsPost as TwitterNewsPostType,
    ExternalResourceNewsPost as ExternalResourceNewsPostType,
} from '@/types/cms'

import {
    Carousel,
    CarouselTrack,
    CarouselSlide,
    CarouselPrevButton,
    CarouselNextButton,
    CarouselProgress,
} from '@/components/base/carousel'
import ArrowLeftIcon from '@/components/icons/arrow-left-icon'
import ArrowRightIcon from '@/components/icons/arrow-right-icon'
import NewsPostDispatcher from './news-post-dispatcher'

import styles from './styles/featured-news.module.scss'

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
        <Carousel
            id='featured-news'
            label='Featured news'
            total={posts?.length}
            autoplayTime={4000}
            transitionTime={500}
            className={styles.carousel}>
            {/* Progress bar */}
            <CarouselProgress className={styles.progress} />

            {/* Slides track */}
            <CarouselTrack className={styles.track}>
                {posts.map((post, idx) => (
                    <CarouselSlide
                        className={styles.slide}
                        label={post?.surtitle}
                        index={idx}
                        key={`featured-news-${idx}`}>
                        <NewsPostDispatcher post={post} />
                    </CarouselSlide>
                ))}
            </CarouselTrack>

            {/* Controls (prev./next) */}
            <nav
                aria-label='Featured news controls'
                className={styles.controls}>
                <CarouselPrevButton className={styles.controlPrev}>
                    <ArrowLeftIcon />
                </CarouselPrevButton>
                <CarouselNextButton className={styles.controlNext}>
                    <ArrowRightIcon />
                </CarouselNextButton>
            </nav>
        </Carousel>
    )
}

/* ========================================================================= */
/* Export(s) */
/* ========================================================================= */

export default FeaturedNews