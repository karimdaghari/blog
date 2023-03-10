import { NextSeo } from 'next-seo';
import type { ReactNode } from 'react';
import { SITE_NAME, SITE_URL } from '~/lib/constants';
import { Container } from './container';
import { Footer } from './footer';
import { Intro, type IntroProps } from './intro';
import { Navbar } from './navbar';

interface Props {
  children: ReactNode;
  className?: string;
  title: string;
  description?: string;
  intro?: IntroProps;
}

export function Layout({
  children,
  className,
  intro,
  title,
  description
}: Props) {
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
      />
      <Container className='py-8'>
        <Navbar />
        <div className='min-h-screen'>
          {intro && (
            <aside>
              <Intro {...intro} />
            </aside>
          )}
          <main className={className}>{children}</main>
        </div>
        <Footer />
      </Container>
    </>
  );
}
