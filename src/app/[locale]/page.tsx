import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import LazyImage from '@/src/components/LazyImage';
import { Link } from '@/src/i18n/navigation';

// DATA
import { awardsData, AwardsDataType } from '../data/awardsData';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'META_DATA' });

  const siteUrl = 'https://kvantsystem.uz';
  // Use the current locale to build the correct current URL
  const currentPath = locale === 'en' ? '/en' : `/${locale}`;
  const url = `${siteUrl}${currentPath}`;
  const ogImage = `${siteUrl}/og/kvant-system.png`;

  return {
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


export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'HomePage' });


  return (
    <main className="mb-32">

      <div className='hero w-full px-4'>
        <div className="max-w-7xl md:mt-2 sm:mt-10 mt-10 mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* LEFT — IMAGE */}
          <div className="relative min-h-32 md:top-20 flex justify-center order-1 md:order-none">
            <LazyImage
              src="/server-card.png"
              alt={"Server Card"}
              className="
                                max-w-[100%]
                                sm:max-w-[70%] 
                                md:max-w-[550px]
                                md:-rotate-3 
                                hover:rotate-0 
                                transition-all duration-700 ease
                            "
              w={600}
              h={400}
              loaderColor="#ddd"
            />
          </div>

          {/* RIGHT — TEXT CONTENT */}
          <div className="text-center flex flex-col items-center">
            <h1 className="uppercase text-4xl sm:text-4xl md:text-5xl font-semibold text-gray-200 leading-tight">
              {t('welcome')}
            </h1>

            <p
              className="text-base text-md mt-6 mb-10 text-white/60 leading-relaxed max-w-xl"
              dangerouslySetInnerHTML={{ __html: t('welcome_sub') }}
            />

            <Link
              href="/services"
              className="
                                py-2 px-6 
                                rounded-full 
                                bg-[#01C38E] 
                                text-gray-900
                                font-medium
                                transition 
                                hover:bg-white 
                                hover:text-gray-900
                            "
            >
              {t('explore_services')}
            </Link>
          </div>
        </div>
      </div>

      {/* <div className="awards">


        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-center gap-32">
          <LazyImage
            src="/__awards/award1.png"
            alt="Award 1"
            w={100}
            h={100}
            className="max-h-16 object-contain grayscale transition-all hover:grayscale-0"
          />
          {
            awardsData.map((item, _): AwardsDataType[] => {
              <LazyImage
                key={item.id}
                src={item.photo}
                alt={item.alt["uz"]}
                w={100}
                h={100}
                className="max-h-16 object-contain grayscale transition-all hover:grayscale-0"
              />
            })
          }
        </div>
      </div> */}

    </main>
  );
}
