import React from 'react'
import 'wicg-inert'

import { ThemeProvider } from '@/contexts/theme'

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
    return (
        <ThemeProvider>
            <Component {...pageProps} />
        </ThemeProvider>
    )
}

/* ========================================================================= */
/* Export(s) */
/* ========================================================================= */
  
export default App