import type { AppProps } from 'next/app';
import '../src/index.css';
import '../src/App.css';
import ScrollProgress from '../src/components/ScrollProgress';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ScrollProgress />
      <Component {...pageProps} />
    </>
  );
}