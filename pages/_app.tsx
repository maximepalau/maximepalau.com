import React from 'react'
import 'wicg-inert'

import '@/assets/styles/index.scss'

/* ========================================================================= */
/* Typing */
/* ========================================================================= */

interface AppProps {
    Component: React.FunctionComponent
    pageProps: {
        [key: string]: any
    }
}

/* ========================================================================= */
/* Component(s) */
/* ========================================================================= */

const App = ({ Component, pageProps }: AppProps) => {
    return <Component {...pageProps} />
}

/* ========================================================================= */
/* Export(s) */
/* ========================================================================= */
  
export default App