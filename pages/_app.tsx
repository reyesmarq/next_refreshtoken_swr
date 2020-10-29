// import App from "next/app";
import axios, { AxiosRequestConfig } from 'axios';
import { decode } from 'jsonwebtoken';
import type { AppProps /*, AppContext */ } from 'next/app';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { trigger } from 'swr';
import { getAccessToken, setAccessToken } from '../utils/accessToken';
// import { useAccessToken } from '../utils/useRefreshToken';

// axios.defaults.baseURL = 'http://localhost:3000';
// axios.defaults.withCredentials = true;
// axios.defaults.headers.authorization = `bearer ${accessToken}`;
axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.withCredentials = true;
axios.interceptors.request.use((config: AxiosRequestConfig) => {
  if (getAccessToken()) {
    // TODO: refactor ignore
    // @ts-ignore
    let { exp } = decode(getAccessToken());

    if (Date.now() >= exp * 1000) {
      fetch('http://localhost:3000/api/users/refreshToken', {
        method: 'post',
        credentials: 'include',
      })
        .then((res) => res.json())
        .then((data) => {
          console.log('setting the new access token: ', data.accessToken);
          setAccessToken(data.accessToken);
          trigger('/api/users');
        })
        .catch((err) => console.log('err while refetching the access token'));
    }
  }

  config.headers['Authorization'] = `bearer ${getAccessToken()}`;

  return config;
});

function MyApp({ Component, pageProps }: AppProps) {
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    const refreshingToken = async () => {
      let data = await axios
        .post('/api/users/refreshToken')
        .then((res) => res.data);

      setAccessToken(data.accessToken);
      axios.interceptors.request.use((config: AxiosRequestConfig) => {
        config.headers['Authorization'] = `bearer ${getAccessToken()}`;

        return config;
      });
      setLoading(false);
    };
    refreshingToken();
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
