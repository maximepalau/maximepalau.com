module.exports = (phase, { defaultConfig }) => ({
    ...defaultConfig,
    sassOptions: {
        prependData: `@import "@/assets/styles/settings/index.scss";`,
    },
})