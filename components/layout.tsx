import { NextSeo } from 'next-seo';
import type { ReactNode } from 'react';
import { SITE_NAME, SITE_URL } from '~/lib/constants';
import { Container } from './container';
import { Navbar } from './navbar';
import clsx from 'clsx';

interface Props {
  children: ReactNode;
  className?: string;
  title: string;
  description?: string;
}

export function Layout({ children, className, title, description }: Props) {
  const origin =
    typeof window !== 'undefined' && window.location.origin
      ? window.location.origin
      : SITE_URL;

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        titleTemplate={`%s | ${SITE_NAME}`}
        additionalLinkTags={[
          {
            rel: 'apple-touch-icon',
            sizes: '180x180',
            href: '/favicon/apple-touch-icon.png'
          },
          {
            rel: 'icon',
            type: 'image/png',
            sizes: '32x32',
            href: '/favicon/favicon-32x32.png'
          },
          {
            rel: 'icon',
            type: 'image/png',
            sizes: '16x16',
            href: '/favicon/favicon-16x16.png'
          },
          { rel: 'manifest', href: '/favicon/site.webmanifest' },
          { rel: 'shortcut icon', href: '/favicon/favicon.ico' }
        ]}
        openGraph={{
          images: [
            {
              url: `${origin}/assets/og-image.png`
            }
          ]
        }}
        twitter={{
          handle: '@karimdaghari_'
        }}
        languageAlternates={[
          {
            hrefLang: 'en',
            href: origin
          }
        ]}
      />
      <Container>
        <Navbar />
        <main className={clsx('pt-10 lg:pt-16', className)}>{children}</main>
      </Container>
    </>
  );
}
