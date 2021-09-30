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
    textRaw: object[]
    url: string
}

export type Project = {
    client: {
        title: string
    }
    descriptionRaw: object[]
    missions: string
    projectUrl: string
    technologies: {
        title: string
    }[]
    title: string
}

export type Article = {
    title: string
    publicationDate: string
    textRaw: object[]
    technologies: {
      title: string
    }[]
    articleUrl: string
}

export type Interest = {
    heading: string
    textRaw: object[]
}