// import App from "next/app";
import axios, { AxiosRequestConfig } from 'axios';
import type { AppProps /*, AppContext */ } from 'next/app';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getAccessToken, setAccessToken } from '../utils/accessToken';

// axios.defaults.baseURL = 'http://localhost:3000';
// axios.defaults.withCredentials = true;
// axios.defaults.headers.authorization = `bearer ${accessToken}`;
axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.withCredentials = true;

function MyApp({ Component, pageProps }: AppProps) {
  let [loading, setLoading] = useState(true);
  // let accessToken = getAccessToken();

  useEffect(() => {
    console.log('rendering');
    console.log('accessToken', getAccessToken());

    const refreshingToken = async () => {
      let data = await axios
        .post('/api/users/refreshToken')
        .then((res) => res.data);

      console.log('data', data);
      setAccessToken(data.accessToken);
      console.log('data.accessToken', getAccessToken());
      // axios.defaults.headers.authorization = `bearer ${getAccessToken()}`;
      axios.interceptors.request.use((config: AxiosRequestConfig) => {
        config.headers['Authorization'] = `bearer ${getAccessToken()}`;

        return config;
      });
      setLoading(false);
    };

    if (!getAccessToken()) {
      refreshingToken();
    }

    // // console.log('after effect', axios.defaults.headers.authorization);
  }, []);

  if (loading) {
    // we can return the loading animation
    return <div>Loading...</div>;
  }

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
        <div>
          <Link href="/UsersWithAuth">Users with auth</Link>
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
