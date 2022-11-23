import '../styles/globals.css';
import '../react-multi-email/style.css';
import 'antd/dist/antd.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>react-multi-email</title>
        <link rel='icon' href='/favicon.ico' />
        <meta name='description' content='react-multi-email example' />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
