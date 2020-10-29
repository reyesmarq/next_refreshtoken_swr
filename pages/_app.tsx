// import App from "next/app";
// import { useAccessToken } from '../utils/useRefreshToken';
import Axios, { AxiosRequestConfig, Method } from 'axios';
import type { AppProps /*, AppContext */ } from 'next/app';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { SWRConfig } from 'swr';
import { getAccessToken, setAccessToken } from '../utils/accessToken';

// axios.defaults.baseURL = 'http://localhost:3000';
// axios.defaults.withCredentials = true;
// axios.defaults.headers.authorization = `bearer ${accessToken}`;
// axios.defaults.baseURL = 'http://localhost:3000';
// axios.defaults.withCredentials = true;

// Refreshing an expired token
Axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // This function is part of a promise chain.
    // It needs to return a value or another promise so the caller knows when it
    // has completed.

    // Pass all non 401s back to the caller.
    if (error.response.status !== 401) {
      return Promise.reject(error);
    }

    // eject removes a previously added interceptor with an id.
    // I don't think you want this, it isn't doing anything.
    // axios.interceptors.response.eject(/* id */);

    // As the refresh request was not being returned, it wasn't part of the
    // promise chain. The callers .then / .catch would be called before the
    // token refresh had completed and you would still have the old token in
    // localStorage.
    return Axios.post(`http://localhost:3000/api/users/refreshToken`)
      .then((response) => {
        setAccessToken(response.data.accessToken);

        // This is updating the header of the config that's just failed.
        // It will not update the header of future requests.
        // error.response.config.headers["Authorization"] = `Bearer ${
        //   response.data.token
        // }`;

        // This will update future request headers
        Axios.defaults.headers.common[
          'Authorization'
        ] = `bearer ${getAccessToken()}`;

        // Still need to return the an error because the original request failed
        // but added a property to show it can be tried again.
        error.hasRefreshedToken = true;
        return Promise.reject('token expired');
      })
      .catch(() => {
        const tokenError = new Error('Cannot refresh token');
        // @ts-ignore
        tokenError.originalError = error;
        return Promise.reject(tokenError);
      });
  }
);

function MyApp({ Component, pageProps }: AppProps) {
  let [loading, setLoading] = useState(false);
  let router = useRouter();

  const fetcher = async (url: string, token: string, method: Method) => {
    const API_BASE: string = 'http://localhost:3000';

    const data = await Axios(`${API_BASE}${url}`, {
      method,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${token}`,
      },
    }).then((res) => res.data);

    return data;
  };

  useEffect(() => {
    console.log('rendering');
    console.log('accessToken', getAccessToken());

    const refreshingToken = async () => {
      let data = await Axios.post('/api/users/refreshToken').then(
        (res) => res.data
      );

      console.log('data', data);
      setAccessToken(data.accessToken);
      console.log('data.accessToken', getAccessToken());
      // axios.defaults.headers.authorization = `bearer ${getAccessToken()}`;
      Axios.interceptors.request.use((config: AxiosRequestConfig) => {
        config.headers['Authorization'] = `bearer ${getAccessToken()}`;

        return config;
      });
      setLoading(false);
    };

    refreshingToken();
  }, []);

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <>
      <SWRConfig
        value={{
          refreshInterval: 3000,
          fetcher,
        }}
      >
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
      </SWRConfig>
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
