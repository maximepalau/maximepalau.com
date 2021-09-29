export type Catchphrase = {
    sentence: string
    author: string
    sourceUrl: string
}

export type ArticleNewsPost = {
    __typename: string
    author: string
    sentence: string
    sourceUrl: string
}

export type ProjectNewsPost = {
    __typename: string
    heading: string
    project: {
        url: string
        surtitle: string
        teaserText: string
    }
}

export type TwitterNewsPost = {
    __typename: string
    surtitle: string
    textRaw: object[]
}

export type ExternalResourceNewsPost = {
    __typename: string
    surtitle: string
    heading: string
    teaserText: string
    resourceUrl: string
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