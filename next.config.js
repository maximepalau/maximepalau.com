module.exports = (phase, { defaultConfig }) => ({
    ...defaultConfig,
    sassOptions: {
        prependData: `@import "@/assets/styles/settings/index.scss";`,
    },
    env: {
        DOMAIN: 'maximepalau.com',
        GOOGLE_ANALYTICS_ID: 'UA-171094327-1',
    },
})