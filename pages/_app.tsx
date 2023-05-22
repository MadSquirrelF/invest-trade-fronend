import '../app/assets/styles/globals.scss';
import type { AppProps } from 'next/app';
import MainProvider from 'providers/MainProvider';
import { TypeComponentAuthFields } from '@/shared/types/auth.types';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';

type TypeAppProps = AppProps & TypeComponentAuthFields;

function App({ Component, pageProps }: TypeAppProps) {
  return (
    <MainProvider Component={Component}>
      <Component {...pageProps} />
    </MainProvider>
  );
}

export default App;
