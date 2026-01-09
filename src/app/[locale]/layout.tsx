import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/src/i18n/routing';

import Header from '@/src/components/Header';
import ProgressBar from '@/src/components/ProgressBar';
import { Saira } from 'next/font/google';
import "@/src/app/globals.css";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};


const saira = Saira({
  subsets: ['latin']
})


export default async function LocaleLayout({ children, params }: Props) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }


  return (
    <html lang={locale} className={saira.className}>
      <body>
        <ProgressBar />
        <NextIntlClientProvider locale={locale} messages={(await import(`../../messages/${locale}.json`)).default}>
          <Header />

          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}