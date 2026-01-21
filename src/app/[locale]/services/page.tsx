import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import LazyImage from '@/src/components/LazyImage';

import { CirclePlus, Globe, MonitorCog, SquarePlus, Store } from "lucide-react";
import Link from 'next/link';
import { ServiceDataType, servicesData } from '../../data/servicesData';
import { commonData } from '@/src/data/common';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'META_DATA' });

  return {
    title: t('services_meta'),
    description: t('services_meta_description'),
    keywords: t('services_meta_description'),
  };
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ServicesPage' });


  const base = "text-sm cursor-pointer flex items-center gap-2 border-2 border-dashed rounded-full p-2 px-4 border-white/20 transition";
  const active = "bg-white/10 text-white";
  const inactive = "text-white/50 hover:bg-white/10";

  return (
    <div className='mb-32'>
      <div className="pt-36  pb-10 mx-auto px-6 bg-[#1E2E3E]">
        <h1 className="font-bold uppercase text-4xl md:text-6xl sm:text-4xl text-center leading-12 mb-8 bg-gradient-to-t to-[#0EA37F] from-[#01C38E50] text-transparent bg-clip-text">
          {t('title')}
        </h1>

        <p className="mb-16 text-center text-xl max-w-[650px] text-shadow-2xs text-shadow-amber-100 mx-auto font-medium text-white/40 leading-10">
          {t('subtitle')}
        </p>


        <div className="flex flex-wrap gap-4 sm:gap-4 md:gap-10 justify-center px-4">

          <Link
            href="/services"
            className={base + " " + active}
          >
            <MonitorCog size={16} strokeWidth={1} />
            <span>Services</span>
          </Link>

          <Link
            href="/services"
            className={base + " " + inactive}
          >
            <Store size={16} strokeWidth={1} />
            <span>Store</span>
          </Link>

          <Link
            href="/services"
            className={base + " " + inactive}
          >
            <Globe size={16} strokeWidth={1} />
            <span>Software</span>
          </Link>

          <Link
            href="/services"
            className={base + " " + inactive}
          >
            <CirclePlus strokeWidth={1} size={16} />
            <span>Hisoblash</span>
            <span>|</span>
            <div className="bg-white px-1.5 py-0.5 rounded-full">
              <p className="text-[11px] font-bold bg-gradient-to-l to-rose-500 from-orange-500 text-transparent bg-clip-text">
                12
              </p>
            </div>
          </Link>
        </div>
      </div>

      <div className="mt-20 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 px-4 mx-auto max-w-7xl">
        {servicesData.map((service: ServiceDataType, idx) => (
          <div key={idx} className="p-0 md:p-8 sm:p-0">
            <ServiceCard service={service} locale={locale} details={t('details')} />
          </div>
        ))}
      </div>
    </div>
  );
}


export function ServiceCard({ service, locale, details }: { service: ServiceDataType, locale: string, details: string }) {
  return (
    <article className="bg-white border border-gray-100 shadow-lg rounded-lg p-2 flex flex-col items-center hover:scale-[1.02] transition-transform duration-300">
      <div className="bg-[#eee] w-full md:min-h-50 flex items-center justify-center overflow-hidden rounded-md">
        <LazyImage w={400} h={150} src={service.photo} alt={service.title[locale as keyof typeof service.title] + " – professional IT service in Uzbekistan"} />
      </div>

      <div className='w-full'>
        <div className="flex flex-wrap items-center justify-between gap-1 w-full pt-2">
          <div className="text-left">
            <h3 className="text-md md:text-md font-medium text-[#333] mb-1">
              {service.title[locale as keyof typeof service.title]}
            </h3>

            <span className="text-sm bg-orange-200 px-1.5 font-semibold text-orange-400 rounded-2xl">
              {service.spend[locale as keyof typeof service.spend]}
            </span>
          </div>

          <a
            href={"tel:" + commonData.socials.phone}
            rel={"noreferrer"}
            className="mt-2 cursor-pointer rounded-md w-full sm:w-full md:w-10 h-10 bg-[#1E2E3E] flex gap-3 items-center justify-center hover:bg-[#01C38E] transition"
          >
            <span className="flex sm:flex md:hidden text-sm text-white/80">{details}</span>
            <SquarePlus size={16} strokeWidth={1} color="white" className="hidden md:flex sm:hidden" />
          </a>
        </div>

        {/* <div className='flex flex-wrap mt-2 gap-2'>
          {service.keywords.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full"
            >
              #{tag.replace(/\s+/g, "")}
            </span>
          ))}
        </div> */}

        <p className="sr-only">
          {service.keywords.join(", ")}
        </p>
      </div>
    </article>

  )
}