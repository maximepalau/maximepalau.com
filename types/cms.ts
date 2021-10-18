import BlockContent from './block-content'

export type Catchphrase = {
    sentence: string
    author: string
    sourceUrl: string
}

export type ArticleNewsPost = {
    __typename: 'ArticleNewsPost'
    heading: string
    surtitle: string | null
    teaserText: string | null
    article: {
        url: string
    }
}

export type ExternalResourceNewsPost = {
    __typename: 'ExternalResourceNewsPost'
    surtitle: string | null
    heading: string
    teaserText: string | null
    resourceUrl: string
}

export type ProjectNewsPost = {
    __typename: 'ProjectNewsPost'
    heading: string
    surtitle: string
    teaserText: string
    project: {
        url: string
    }
}

export type TwitterNewsPost = {
    __typename: 'TwitterNewsPost'
    surtitle: string
    textRaw: BlockContent
    url: string
}

export type Project = {
    id: string
    client: {
        title: string
    }
    descriptionRaw: BlockContent
    missions: string
    projectUrl: string
    technologies: {
        title: string
    }[]
    title: string
}

export type Article = {
    id: string
    title: string
    publicationDate: string
    technologies: {
      title: string
    }[]
    articleUrl: string
}

export type Interest = {
    heading: string
    textRaw: BlockContent
}

export type Globals = {
    linkedinUrl: string
    twitterUrl: string
    githubUrl: string
}