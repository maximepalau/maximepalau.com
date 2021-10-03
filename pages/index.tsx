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
    Globals as GlobalsType,
} from '@/types/cms'
import BlockContentType from '@/types/block-content'
import { Page, PageHero, PageMain, PageSection, PageFooter } from '@/components/globals/page'
import Catchphrase from '@/components/globals/catchphrase'
import Hero from '@/components/globals/hero'

import ProjectList from '@/components/projects/project-list'
import ArticleList from '@/components/articles/article-list'

/* ========================================================================= */
/* Type(s) */
/* ========================================================================= */

type HomePageProps = {
    articles: ArticleType[]
    articlesCatchphrase: CatchphraseType
    articlesTextRaw: BlockContentType
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
    globals: GlobalsType
}

/* ========================================================================= */
/* Static props */
/* ========================================================================= */

export const getStaticProps = async () => {
    const { data } = await client.query({ query: homePageQuery })

    return {
        props: {
            ...(data.allHome[0] || {}),
            globals: data.allGlobals[0]
        }
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
                <Hero
                    heading={props.title}
                    introduction={props.introductionRaw}
                    news={props.featuredNews} />
            </PageHero>

            {/* Navigation */}
            <nav aria-label='Page sections'>
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

            <PageMain>
                {/* Info & contact */}
                {sections.infoContact.isEnabled && (
                    <PageSection id={sections.infoContact.id}>
                        <Catchphrase {...(props.infoContactCatchphrase || {})} />
                        <h2>{sections.infoContact.heading}</h2>
                        <BlockContent blocks={props.infoContactTextRaw} />
                        <address>
                            <a href={props.infoContactEmail}>Contact me by email</a>
                            <ul>
                                <li>
                                    <button type='button'>Copy email</button>
                                </li>
                                <li>
                                    <a href={props.infoContactEmail}>Contact me by LinkedIn</a>
                                </li>
                            </ul>
                        </address>
                    </PageSection>
                )}

                {/* Projects */}
                {sections.projects.isEnabled && (
                    <PageSection id={sections.projects.id}>
                        <Catchphrase {...(props.projectsCatchphrase || {})} />
                        <h2>{sections.projects.heading}</h2>
                        <BlockContent blocks={props.projectsTextRaw} />
                        <ProjectList posts={props.projects} />
                    </PageSection>
                )}

                {/* Articles */}
                {sections.articles.isEnabled && (
                    <PageSection id={sections.articles.id}>
                        <Catchphrase {...(props.articlesCatchphrase || {})} />
                        <h2>{sections.articles.heading}</h2>
                        <BlockContent blocks={props.articlesTextRaw} />
                        <ArticleList posts={props.articles} />
                    </PageSection>
                )}

                {/* Interests */}
                {sections.interests.isEnabled && (
                    <PageSection id={sections.interests.id}>
                        <Catchphrase {...(props.interestsCatchphrase || {})} />
                        <h2>{sections.interests.heading}</h2>
                        {props.interests?.map((interest, idx) => (
                            <section key={`interest-${idx}`}>
                                <h3>{interest.heading}</h3>
                                <BlockContent blocks={interest.textRaw} />
                            </section>
                        ))}
                    </PageSection>
                )}
            </PageMain>

            <PageFooter>
                <h2>{props.footerHeading}</h2>
                <BlockContent blocks={props.footerTextRaw} />
                <address>
                    <a href={props.footerEmail}>Contact me by email</a>
                    <ul>
                        <li>
                            <button type='button'>Copy email</button>
                        </li>
                        <li>
                            <a href={props.infoContactEmail}>Contact me by LinkedIn</a>
                        </li>
                    </ul>
                </address>
                <address aria-label='Social media'>
                    <ul>
                        {props.globals?.twitterUrl && (
                            <li>
                                <a href={props.globals.twitterUrl}>Twitter</a>
                            </li>
                        )}
                        {props.globals?.linkedinUrl && (
                            <li>
                                <a href={props.globals.linkedinUrl}>LinkedIn</a>
                            </li>
                        )}
                        {props.globals?.githubUrl && (
                            <li>
                                <a href={props.globals.githubUrl}>Github</a>
                            </li>
                        )}
                    </ul>
                </address>
            </PageFooter>
        </Page>
    )
}

export default HomePage