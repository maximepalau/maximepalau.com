/**
 * 1. Creates an interface for the Rick & Morty API as a common secure pattern.
 *    This enables us to easily modify later on the request properties
 *    and to ensure they always stay secure (in the event we would need a private key).
 */
module.exports = (phase, { defaultConfig }) => ({
    ...defaultConfig,
    sassOptions: {
        prependData: `@import "@/assets/styles/settings/index.scss";`,
    },
    env: {
        domain: 'localhost:3000',
    },
    // async rewrites () {
    //     return [
    //         { /* [1] */
    //             source: '/api',
    //             destination: 'https://rickandmortyapi.com/graphql',
    //         },
    //     ]
    // },
})