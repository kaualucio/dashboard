import '../styles/globals.scss';
import '../styles/textEditor.scss';
import '../styles/home.module.scss';
import '@fullcalendar/common/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.core.css';
import type { AppProps } from 'next/app';
import { Layout } from '../src/components/Layout';
import { SWRConfig } from 'swr';
import { Toaster } from 'react-hot-toast';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <SWRConfig>
        <Component {...pageProps} />
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
    </Layout>
  );
}

export default MyApp;
