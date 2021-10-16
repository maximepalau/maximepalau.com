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
import ContactButton from '@/components/globals/contact-button'
import Navigation from '@/components/globals/navigation'
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
            isEnabled: !!props.infoContactTextRaw,
        },
        projects: {
            heading: 'Projects',
            id: 'projects',
            isEnabled: true,
        },
        articles: {
            heading: 'Articles',
            id: 'articles',
            isEnabled: false,
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
            <Navigation
                globals={props.globals}
                sections={Object.values(sections)} />

            <PageMain>
                {/* Info & contact */}
                {sections.infoContact.isEnabled && (
                    <PageSection
                        className='section'
                        id={sections.infoContact.id}>
                        <Catchphrase {...(props.infoContactCatchphrase || {})} />

                        <div className='container'>
                            <div className='section__content'>
                                {/* Heading */}
                                <div className='section__left'>
                                    <h2 className='type-style-6 uppercase'>
                                        {sections.infoContact.heading}
                                    </h2>
                                </div>

                                <div className='section__right'>
                                    {/* Text */}
                                    <BlockContent className='rich-text type-style-5' blocks={props.infoContactTextRaw} />

                                    {/* Contact button */}
                                    {props.infoContactEmail && (
                                        <div className='section__action'>
                                            <ContactButton
                                                email={props.infoContactEmail}
                                                id='info-contact-contact-button'
                                                linkedinUrl={props.globals.linkedinUrl} />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </PageSection>
                )}

                {/* Projects */}
                {sections.projects.isEnabled && (
                    <PageSection
                        className='section inverted-text-color inverted-background-color'
                        id={sections.projects.id}>
                        <Catchphrase isReverted {...(props.projectsCatchphrase || {})} />

                        <div className='container'>
                            <div className='section__content'>
                                {/* Heading */}
                                <div className='section__left'>
                                    <h2 className='type-style-6 uppercase'>
                                        {sections.projects.heading}
                                    </h2>
                                </div>

                                <div className='section__right'>
                                    {/* Text */}
                                    <BlockContent className='rich-text type-style-5' blocks={props.projectsTextRaw} />
                                </div>

                                <div className='section__full'>
                                    <ProjectList posts={props.projects} />
                                </div>
                            </div>
                        </div>
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
                        
                        <div className='container'>
                            <div className='section__content'>
                                {/* Heading */}
                                <div className='section__left'>
                                    <h2 className='type-style-6 uppercase'>
                                        {sections.interests.heading}
                                    </h2>
                                </div>

                                <div className='section__full' />
                            </div>

                            {props.interests?.map((interest, idx) => (
                                <section
                                    className={`section__content section__content--outline ${idx === 0 ? 'section__content--tight' : ''}`}
                                    key={`interest-${idx}`}>
                                    {/* Heading */}
                                    <div className='section__left'>
                                        <h3 className='type-style-6 uppercase'>
                                            {interest.heading}
                                        </h3>
                                    </div>
                                    
                                    {/* Text */}
                                    <div className='section__right rich-text type-style-5'>
                                        <BlockContent blocks={interest.textRaw} />
                                    </div>
                                </section>
                            ))}
                        </div>
                    </PageSection>
                )}
            </PageMain>

            <PageFooter>
                <h2>{props.footerHeading}</h2>
                <BlockContent blocks={props.footerTextRaw} />
                {/* Contact button */}
                {props.infoContactEmail && (
                    <div className='section__action'>
                        <ContactButton
                            email={props.infoContactEmail}
                            id='info-contact-contact-button'
                            linkedinUrl={props.globals.linkedinUrl} />
                    </div>
                )}
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