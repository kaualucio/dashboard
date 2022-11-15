import '../styles/globals.scss';
import '../styles/textEditor.scss';
import '../styles/home.module.scss';
import '@fullcalendar/common/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.core.css';
import { ReactElement, ReactNode } from 'react';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import type { Session } from 'next-auth';
import { SWRConfig } from 'swr';
import { Toaster } from 'react-hot-toast';
import { SessionProvider } from 'next-auth/react';
import { AuthContextProvider } from '../src/context/AuthContext';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps<{ session: Session }> & {
  Component: NextPageWithLayout;
};

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  const getLayout = Component.getLayout;
  return (
    <SessionProvider session={session}>
      <SWRConfig value={{ revalidateOnFocus: false, revalidateIfStale: true }}>
        {getLayout ? (
          <AuthContextProvider>
            {getLayout(<Component {...pageProps} />)}
          </AuthContextProvider>
        ) : (
          <Component {...pageProps} />
        )}
      </SWRConfig>
      <Toaster
        toastOptions={{
          loading: 'style',
          position: 'top-right',
          duration: 4000,
          success: {
            style: {
              paddingTop: 18,
              paddingBottom: 18,
              borderLeftWidth: 6,
              borderRadius: 13,
              borderLeftColor: '#48945B',
              backgroundColor: '#ACE6AB',
              color: '#63AD6F',
              fontSize: 14,
            },
          },
          error: {
            style: {
              paddingTop: 18,
              paddingBottom: 18,
              borderLeftWidth: 6,
              borderRadius: 13,
              borderLeftColor: '#B0374C',
              backgroundColor: '#FCB7A8',
              color: '#D2505B',
              fontSize: 14,
            },
          },
        }}
      />
    </SessionProvider>
  );
}

export default MyApp;
