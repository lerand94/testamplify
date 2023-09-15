import { Layout } from '@/components/Layout';
import '@/styles/globals.css'
import '@aws-amplify/ui-react/styles.css';
import type { AppProps } from 'next/app'
import {Amplify} from 'aws-amplify';
import awsconfig from '../aws-exports'
import { Authenticator } from '@aws-amplify/ui-react'

Amplify.configure({
  ...awsconfig,ssr:true
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Authenticator.Provider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Authenticator.Provider>
  )
}
