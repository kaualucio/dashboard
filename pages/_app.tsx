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

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <SWRConfig>
        <Component {...pageProps} />
      </SWRConfig>
    </Layout>
  );
}

export default MyApp;
