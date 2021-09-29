import React, { FunctionComponent } from 'react'

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
    Project as ProjectType
} from '@/types/cms'
import { Page, PageSection } from '@/components/globals/page'
import Catchphrase from '@/components/globals/catchphrase'

/* ========================================================================= */
/* Type(s) */
/* ========================================================================= */

type HomePageProps = {
    articles: ArticleType[]
    articlesCatchphrase: CatchphraseType
    featuredNews: (TwitterNewsPostType | ProjectNewsPostType | ArticleNewsPostType | ExternalResourceNewsPostType)[]
    footerEmail: string
    footerHeading: string
    footerTextRaw: object[]
    infoContactCatchphrase: CatchphraseType
    infoContactEmail: string
    infoContactTextRaw: object[]
    interests: InterestType[]
    interestsCatchphrase: CatchphraseType
    introductionRaw: object[]
    projectsCatchphrase: CatchphraseType
    projects: ProjectType[]
    projectsTextRaw: object[]
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

    return (
        <Page>
            <PageSection>
                <Catchphrase {...(props.infoContactCatchphrase || {})} />
            </PageSection>
            <PageSection>
                <Catchphrase {...(props.projectsCatchphrase || {})} />
            </PageSection>
            <PageSection>
                <Catchphrase {...(props.articlesCatchphrase || {})} />
            </PageSection>
            <PageSection>
                <Catchphrase {...(props.interestsCatchphrase || {})} />
            </PageSection>
        </Page>
    )
}

export default HomePage