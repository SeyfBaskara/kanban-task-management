import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from 'components/layout/Layout'
import { ThemeProvider } from 'next-themes'

import { wrapper } from 'app/store'

function MyApp({ Component, pageProps }: AppProps) {
   return (
      <ThemeProvider enableSystem={true} attribute="class">
         <Layout>
            <Component {...pageProps} />
         </Layout>
      </ThemeProvider>
   )
}

export default wrapper.withRedux(MyApp)
