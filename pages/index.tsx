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

import { Page, PageHero, PageMain, PageSection, PageFooter } from '@/components/globals/page'
import ContactButton from '@/components/globals/contact-button'
import Navigation from '@/components/globals/navigation'
import Footer from '@/components/globals/footer'
import Catchphrase from '@/components/globals/catchphrase'
import Hero from '@/components/globals/hero'
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
        <>
            <Head>
                <title>Maxime Palau</title>
                <meta name='keywords' content='web development, design, web design, graphic design, digital marketing, branding, brussels, london, identity' />
                <meta name='description' content='Web adventurer from the kingdom of Belgium' />
                <meta name='referrer' content='no-referrer-when-downgrade' />
                <meta name='robots' content='all' />
                <meta content='en_UK' property='og:locale' />
                <meta content='Maxime Palau' property='og:site_name' />
                <meta content='website' property='og:type' />
                <meta content='https://maximepalau.com/' property='og:url' />
                <meta content='Maxime Palau' property='og:title' />
                <meta content='Web adventurer from the kingdom of Belgium' property='og:description' />
                <meta content='https://github.com/maximepalau' property='og:see_also' />
                <meta content='https://www.linkedin.com/in/maxime-palau-708a90a7/' property='og:see_also' />
                <meta content='https://twitter.com/maximepalau' property='og:see_also' />
                <meta name='twitter:card' content='summary' />
                <meta name='twitter:site' content='@maximepalau' />
                <meta name='twitter:creator' content='@maximepalau' />
                <meta name='twitter:title' content='Maxime Palau' />
                <meta name='twitter:description' content='Web adventurer from the kingdom of Belgium' />
                <link rel='shortcut icon' href='/favicon.ico' type='image/x-icon' />
                <link rel='icon' href='/favicon.ico' type='image/x-icon' />
            </Head>
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
                            <Catchphrase isReverted {...(props.projectsCatchphrase || {})} />

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
                            </div>
                        </PageSection>
                    )}
                </PageMain>

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