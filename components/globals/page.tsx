import React, { FunctionComponent, ComponentPropsWithoutRef } from 'react'

/* ========================================================================= */
/* Type(s) */
/* ========================================================================= */

type PageProps = {} & ComponentPropsWithoutRef<'div'>

type PageHeroProps = {} & ComponentPropsWithoutRef<'header'>

type PageMainProps = {} & ComponentPropsWithoutRef<'main'>

type PageSectionProps = {} & ComponentPropsWithoutRef<'section'>

type PageFooterProps = {} & ComponentPropsWithoutRef<'footer'>

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
        <header {...props} />
    )
}

export const PageMain: FunctionComponent<PageMainProps> = props => {

    return (
        <main tabIndex={-1} id='page-content' {...props} />
    )
}

export const PageSection: FunctionComponent<PageSectionProps> = props => {

    return (
        <section tabIndex={-1} {...props} />
    )
}

export const PageFooter: FunctionComponent<PageFooterProps> = props => {

    return (
        <footer {...props} />
    )
}