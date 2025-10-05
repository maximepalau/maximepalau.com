import React, { FunctionComponent } from 'react'
import Head from 'next/head'
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

import HeadContent from '@/components/globals/head-content'
import { Page, PageHero, PageMain, PageSection, PageFooter } from '@/components/globals/page'
import ContactButton from '@/components/globals/contact-button'
import Navigation from '@/components/globals/navigation'
import Footer from '@/components/globals/footer'
import Catchphrase from '@/components/globals/catchphrase'
import Hero from '@/components/globals/hero'
import GithubPromotionalBanner from '@/components/globals/github-promotional-banner'
import ProjectList from '@/components/projects/project-list'
import ArticleList from '@/components/articles/article-list'

/* ========================================================================= */
/* Type(s) */
/* ========================================================================= */

export type HomePageProps = {
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
    projectsClosingTextRaw: BlockContentType
    title: string
    githubPromotionHeading: string
    githubPromotionText: string
    githubPromotionLinkLabel: string
    githubPromotionLinkUrl: string
    globals: GlobalsType
}

/* ========================================================================= */
/* Static props */
/* ========================================================================= */

export const getStaticProps = async () => {
    const response = await client.query({ query: homePageQuery })

    if (!response || !response.data) {
        throw new Error('COULD_NOT_FETCH')
    }

    return {
        props: {
            ...(response.data.allHome[0] || {}),
            globals: response.data.allGlobals[0],
        },
        revalidate: 300
    }
}

/* ========================================================================= */
/* Component(s) */
/* ========================================================================= */

export const HomePage: FunctionComponent<HomePageProps> = props => {
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
    }

    return (
        <>
            {/* Head */}
            <Head>
                <title>Maxime Palau</title>
                <HeadContent
                    title='Maxime Palau'
                    description='Web adventurer from the kingdom of Belgium.'
                    globals={props.globals} />
            </Head>

            {/* Page */}
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
                            className='section'
                            id={sections.projects.id}
                            isDarkMode>
                            <Catchphrase {...(props.projectsCatchphrase || {})} />

                            <div className='container'>
                                <div className='section__content'>
                                    {/* Heading */}
                                    <div className='section__left'>
                                        <h2 className='type-style-6 uppercase'>
                                            {sections.projects.heading}
                                        </h2>
                                    </div>

                                    <div className='section__right rich-text type-style-5'>
                                        {/* Text */}
                                        <BlockContent blocks={props.projectsTextRaw} />
                                    </div>
                                </div>
                                <div className='section__content'>
                                    {/* List */}
                                    <div className='section__full'>
                                        <ProjectList posts={props.projects} />
                                    </div>
                                </div>
                                <div className='section__content section__content--bottom-padded'>
                                    {/* Closing text */}
                                    {props.projectsClosingTextRaw && (
                                        <>
                                            <div className='section__left' />

                                            <div className='section__right'>
                                                {/* Text */}
                                                <div className='rich-text type-style-5'>
                                                    <BlockContent blocks={props.projectsClosingTextRaw} />
                                                </div>

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
                                        </>
                                    )}
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

                                {/* Github promotion */}
                                {props.githubPromotionHeading && props.githubPromotionText && props.githubPromotionLinkLabel && props.githubPromotionLinkUrl && (
                                    <div className='section__content'>
                                        <div className='section__full'>
                                            <GithubPromotionalBanner
                                                heading={props.githubPromotionHeading}
                                                text={props.githubPromotionText}
                                                linkLabel={props.githubPromotionLinkLabel}
                                                linkUrl={props.githubPromotionLinkUrl} />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </PageSection>
                    )}
                </PageMain>

                {/* Footer */}
                <PageFooter isDarkMode>
                    <Footer
                        heading={props.footerHeading}
                        text={props.footerTextRaw}
                        email={props.infoContactEmail}
                        globals={props.globals} />
                </PageFooter>
            </Page>
        </>
    )
}

export default HomePage