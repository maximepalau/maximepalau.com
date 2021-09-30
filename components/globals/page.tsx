import React, { FunctionComponent } from 'react'

/* ========================================================================= */
/* Type(s) */
/* ========================================================================= */

type PageProps = {}

type PageHeroProps = {}

type PageSectionProps = {}

/* ========================================================================= */
/* Component(s) */
/* ========================================================================= */

export const Page: FunctionComponent<PageProps> = props => {

    return (
        <div {...props} />
    )
}

export const PageHero: FunctionComponent<PageHeroProps> = props => {

    return (
        <div {...props} />
    )
}

export const PageSection: FunctionComponent<PageSectionProps> = props => {

    return (
        <section tabIndex={-1} {...props} />
    )
}