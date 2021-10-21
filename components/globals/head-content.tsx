import React, { FunctionComponent } from 'react'

/* ========================================================================= */
/* Type(s) */
/* ========================================================================= */

type HeadContentProps = {
    title: string
    description: string
    globals: {
        githubUrl?: string | null
        linkedinUrl?: string | null
        twitterUrl?: string | null
    }
}

/* ========================================================================= */
/* Component(s) */
/* ========================================================================= */

const HeadContent: FunctionComponent<HeadContentProps> = ({ description, globals, title }) => {

    return (
        <>
            <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_ANALYTICS_ID}`} />
            <script
                dangerouslySetInnerHTML={{
                    __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', '${process.env.GOOGLE_ANALYTICS_ID}', {
                            page_path: window.location.pathname,
                        });
                    `,
                }}/>
            <meta name='description' content={description} />
            <meta name='referrer' content='no-referrer-when-downgrade' />
            <meta name='robots' content='all' />
            <meta content='en_UK' property='og:locale' />
            <meta content={title} property='og:site_name' />
            <meta content='website' property='og:type' />
            <meta content='https://maximepalau.com/' property='og:url' />
            <meta content={title} property='og:title' />
            <meta content={description} property='og:description' />
            {globals.githubUrl && (
                <meta content={globals.githubUrl} property='og:see_also' />
            )}
            {globals.linkedinUrl && (
                <meta content={globals.linkedinUrl} property='og:see_also' />
            )}
            {globals.twitterUrl && (
                <meta content={globals.twitterUrl} property='og:see_also' />
            )}
            <meta name='twitter:card' content='summary' />
            <meta name='twitter:site' content='@maximepalau' />
            <meta name='twitter:creator' content='@maximepalau' />
            <meta name='twitter:title' content={title} />
            <meta name='twitter:description' content={description} />
            <link rel='shortcut icon' href='/favicon.ico' type='image/x-icon' />
            <link rel='icon' href='/favicon.ico' type='image/x-icon' />
        </>
    )
}

/* ========================================================================= */
/* Export(s) */
/* ========================================================================= */

export default HeadContent