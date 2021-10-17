import React from 'react'
import { AppProps } from 'next/app'
import 'wicg-inert'

import { ThemeProvider } from '@/contexts/theme'

import '@/assets/styles/index.scss'

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