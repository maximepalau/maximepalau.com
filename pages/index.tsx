import React, { FunctionComponent } from 'react'
import BlockContent from '@sanity/block-content-to-react'

import client from '@/plugins/apollo-client'
import homePageQuery from '@/queries/home-page'
import {
    Article as ArticleType,
    Catchphrase as CatchphraseType,
    ArticleNewsPost as ArticleNewsPostType,
    ProjectNewsPost as ProjectNewsPostType,
    TwitterNewsPost as TwitterNewsPostType,
    ExternalResourceNewsPost as ExternalResourceNewsPostType,
    Interest as InterestType,
    Project as ProjectType,
} from '@/types/cms'
import BlockContentType from '@/types/block-content'
import { Page, PageHero, PageSection } from '@/components/globals/page'
import Catchphrase from '@/components/globals/catchphrase'
import FeaturedNews from '@/components/news/featured-news'

/* ========================================================================= */
/* Type(s) */
/* ========================================================================= */

type HomePageProps = {
    articles: ArticleType[]
    articlesCatchphrase: CatchphraseType
    featuredNews: (TwitterNewsPostType | ProjectNewsPostType | ArticleNewsPostType | ExternalResourceNewsPostType)[]
    footerEmail: string
    footerHeading: string
    footerTextRaw: BlockContentType
    infoContactCatchphrase: CatchphraseType
    infoContactEmail: string
    infoContactTextRaw: BlockContentType
    interests: InterestType[]
    interestsCatchphrase: CatchphraseType
    introductionRaw: BlockContentType
    projectsCatchphrase: CatchphraseType
    projects: ProjectType[]
    projectsTextRaw: BlockContentType
    title: string
}

/* ========================================================================= */
/* Static props */
/* ========================================================================= */

export const getStaticProps = async () => {
    const { data } = await client.query({ query: homePageQuery })

    return {
        props: data.allHome[0],
    }
}

/* ========================================================================= */
/* Component(s) */
/* ========================================================================= */

export const HomePage: FunctionComponent<HomePageProps> = props => {
    console.log(props)

    const sections = {
        infoContact: {
            heading: 'Info & contact',
            id: 'info-contact',
            isEnabled: true,
        },
        projects: {
            heading: 'Projects',
            id: 'projects',
            isEnabled: true,
        },
        articles: {
            heading: 'Articles',
            id: 'articles',
            isEnabled: true,
        },
        interests: {
            heading: 'Interests',
            id: 'interests',
            isEnabled: true,
        },
    };

    return (
        <Page>
            {/* Hero */}
            <PageHero>
                <h1>
                    {props.title}
                </h1>

                <BlockContent blocks={props.introductionRaw} />
                <FeaturedNews posts={props.featuredNews} />
            </PageHero>

            {/* Navigation */}
            <nav>
                <ul>
                    {Object.values(sections).map((section: { heading: string, id: string, isEnabled: boolean }) => section.isEnabled && (
                        <li key={'nav-item' + section.id}>
                            <a href={`#${section.id}`}>
                                {section.heading}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Info & contact */}
            {sections.infoContact.isEnabled && (
                <PageSection>
                    <Catchphrase {...(props.infoContactCatchphrase || {})} />
                </PageSection>
            )}

            {/* Projects */}
            {sections.projects.isEnabled && (
                <PageSection>
                    <Catchphrase {...(props.projectsCatchphrase || {})} />
                </PageSection>
            )}

            {/* Articles */}
            {sections.articles.isEnabled && (
                <PageSection>
                    <Catchphrase {...(props.articlesCatchphrase || {})} />
                </PageSection>
            )}

            {/* Interests */}
            {sections.interests.isEnabled && (
                <PageSection>
                    <Catchphrase {...(props.interestsCatchphrase || {})} />
                </PageSection>
            )}
        </Page>
    )
}

export default HomePage