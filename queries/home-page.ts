import { gql } from '@apollo/client'

export default gql`
    query {
        allHome (offset: 1, limit: 1) {
            title
            introductionRaw
            featuredNews {
                __typename
        
                ... on ArticleNewsPost {
                    surtitle
                    heading
                    teaserText
                    article {
                        url: articleUrl
                    }
                }
            
                ... on ExternalResourceNewsPost {
                    surtitle
                    heading
                    teaserText
                    resourceUrl
                }
                
                ... on ProjectNewsPost {
                    surtitle
                    heading
                    teaserText
                    project {
                        url: projectUrl
                    }
                }
        
                ... on TwitterNewsPost {
                    surtitle
                    textRaw
                    url
                }
            }
            infoContactCatchphrase {
                sentence
                author
                sourceUrl
            }
            infoContactTextRaw
            infoContactEmail
            projectsCatchphrase {
                sentence
                author
                sourceUrl
            }
            projectsTextRaw
            projects {
                title
                missions
                technologies {
                    title
                }
                client {
                    title
                }
                descriptionRaw
                projectUrl
            }
            articlesCatchphrase {
                sentence
                author
                sourceUrl
            }
            articles {
                title
                publicationDate
                technologies {
                    title
                }
                articleUrl
            }
            interestsCatchphrase {
                sentence
                author
                sourceUrl
            }
            interests {
                heading
                textRaw
            }
            footerHeading
            footerTextRaw
            footerEmail
        } 
    }
`