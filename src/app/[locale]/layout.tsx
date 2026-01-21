import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { routing } from '@/src/i18n/routing';

import Header from '@/src/components/Header';
import { Saira } from 'next/font/google';
import "@/src/app/globals.css";
import Head from 'next/head';
// import ChatWidget from '@/src/components/ChatWidget';
import JsonLd from "@/src/components/JsonLd";
import { commonData } from '@/src/data/common';

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};


const saira = Saira({
  subsets: ['latin']
})


export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'META_DATA' });

  const siteUrl = 'https://kvantsystem.uz';
  // Use the current locale to build the correct current URL
  const currentPath = locale === 'en' ? '/en' : `/${locale}`;
  const url = `${siteUrl}${currentPath}`;
  const ogImage = `${siteUrl}/og/kvant-system.png`;

  return {
    verification: {
      google: 'OCO_f-iFaSu9dXSpgi2W4IPMq5t_-Nddr5RX9X2F8Do'
    },
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      url,
      siteName: 'Kvant System',
      images: [{ url: ogImage, width: 1200, height: 630, alt: t('title') }],
      locale: locale.replace('-', '_'),
      type: 'website',
    },
    alternates: {
      // Dynamic canonical points to the URL of the current language version
      canonical: url,
      languages: {
        "en": `${siteUrl}/en`,
        "ru": `${siteUrl}/ru`,
        "uz": `${siteUrl}/uz`,
        "x-default": `${siteUrl}/en` // Recommended for search engines
      }
    }
  };
}


export default async function LocaleLayout({ children, params }: Props) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Kvant System",
    url: commonData.site_URL,
    logo: "https://kvantsystem.uz/logo.png",
    sameAs: [
      commonData.socials.telegram,
      commonData.socials.instagram,
    ],
  };


  return (
    <html lang={locale} className={saira.className}>
      <Head>
        <meta name="google-site-verification" content="OCO_f-iFaSu9dXSpgi2W4IPMq5t_-Nddr5RX9X2F8Do" />
      </Head>
      <body>
        <JsonLd data={orgJsonLd} />
        <NextIntlClientProvider locale={locale} messages={(await import(`../../messages/${locale}.json`)).default}>
          <Header />
          {children}

          {/* <ChatWidget /> */}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}