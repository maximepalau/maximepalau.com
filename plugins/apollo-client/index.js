import { ApolloClient, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
    // uri: 'https://<yourProjectId>.api.sanity.io/v1/graphql/<dataset>/<tag>',
    uri: 'https://duuk377d.api.sanity.io/v1/graphql/production/default',
    cache: new InMemoryCache(),
})

export default client