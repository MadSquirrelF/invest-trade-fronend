import { accentColor } from 'config/constants';
import { FC } from 'react';
import NextProgressBar from 'nextjs-progressbar';
import Head from 'next/head';
import Favicons from './Favicons';

type Props = {
  children: React.ReactNode;
};
const HeadProvider: FC<Props> = ({ children }) => (
  <>
    <NextProgressBar
      color={accentColor}
      startPosition={0.3}
      stopDelayMs={200}
      height={3}
    />
    <Head>
      <meta charSet="UTF-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1.0"
      />

      <Favicons />

      <meta
        name="theme-color"
        content="#fff"
      />
      <meta
        name="msapplication-navbutton-color"
        content="#fff"
      />
      <meta
        name="apple-mobile-web-app-status-bar-style"
        content="#fff"
      />
    </Head>
    {children}
  </>
);

export default HeadProvider;
