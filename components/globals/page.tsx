import React, { FunctionComponent } from 'react'

/* ========================================================================= */
/* Type(s) */
/* ========================================================================= */

type PageProps = {}

type PageSectionProps = {}

/* ========================================================================= */
/* Component(s) */
/* ========================================================================= */

export const Page: FunctionComponent<PageProps> = props => {

    return (
        <div {...props} />
    )
}

export const PageSection: FunctionComponent<PageSectionProps> = props => {

    return (
        <div {...props} />
    )
}