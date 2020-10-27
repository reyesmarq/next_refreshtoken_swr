// import App from "next/app";
import axios from 'axios';
import type { AppProps /*, AppContext */ } from 'next/app';
import Link from 'next/link';

axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.withCredentials = true;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <nav>
        <div>
          <Link href="/">Home</Link>
        </div>
        <div>
          <Link href="/register">Register</Link>
        </div>
        <div>
          <Link href="/login">Login</Link>
        </div>
      </nav>
      <br />
      <Component {...pageProps} />
    </>
  );
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext: AppContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps }
// }

export default MyApp;
