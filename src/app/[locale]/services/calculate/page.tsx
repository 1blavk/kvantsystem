import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import ServiceCalculatorClient from '@/src/components/calculator/ServiceCalculatorClient';
import { servicesData } from '@/src/app/data/servicesData';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'CalculatePage' });

  const siteUrl = 'https://kvantsystem.uz';
  const currentPath = `/${locale}/services/calculate`;
  const url = `${siteUrl}${currentPath}`;

  return {
    title: `${t('title')} | Kvant System`,
    description: t('subtitle'),
    alternates: {
      canonical: url,
      languages: {
        en: `${siteUrl}/en/services/calculate`,
        ru: `${siteUrl}/ru/services/calculate`,
        uz: `${siteUrl}/uz/services/calculate`,
        'x-default': `${siteUrl}/uz/services/calculate`,
      },
    },
  };
}

export default async function CalculatePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const tCalc = await getTranslations({ locale, namespace: 'CalculatePage' });
  const tServ = await getTranslations({ locale, namespace: 'ServicesPage' });

  const translations = {
    title: tCalc('title'),
    subtitle: tCalc('subtitle'),
    badge: tCalc('badge'),
    filter_all: tCalc('filter_all'),
    filter_security: tCalc('filter_security'),
    filter_infrastructure: tCalc('filter_infrastructure'),
    filter_network: tCalc('filter_network'),
    filter_support: tCalc('filter_support'),
    search_placeholder: tCalc('search_placeholder'),
    selected_summary_title: tCalc('selected_summary_title'),
    empty_cart_title: tCalc('empty_cart_title'),
    empty_cart_desc: tCalc('empty_cart_desc'),
    estimated_total: tCalc('estimated_total'),
    som_equivalent: tCalc('som_equivalent'),
    estimated_time: tCalc('estimated_time'),
    days: tCalc('days'),
    clear_all: tCalc('clear_all'),
    add_to_quote: tCalc('add_to_quote'),
    added: tCalc('added'),
    remove_item: tCalc('remove_item'),
    select_tier: tCalc('select_tier'),
    extra_options_title: tCalc('extra_options_title'),
    express_title: tCalc('express_title'),
    express_desc: tCalc('express_desc'),
    warranty_title: tCalc('warranty_title'),
    warranty_desc: tCalc('warranty_desc'),
    send_telegram: tCalc('send_telegram'),
    call_button: tCalc('call_button'),
    copy_quote: tCalc('copy_quote'),
    copied: tCalc('copied'),
    currency_note: tCalc('currency_note'),
    back_to_services: tCalc('back_to_services'),
    request_consultation: tCalc('request_consultation'),
    form_name: tCalc('form_name'),
    form_phone: tCalc('form_phone'),
    form_object: tCalc('form_object'),
    form_notes: tCalc('form_notes'),
    form_submit: tCalc('form_submit'),
    form_success: tCalc('form_success'),
    services_tab: tServ('services_tab'),
    store_tab: tServ('store_tab'),
    software_tab: tServ('software_tab'),
    calculate_tab: tServ('calculate_tab'),
  };

  return (
    <ServiceCalculatorClient
      key={locale}
      services={servicesData}
      locale={locale}
      translations={translations}
    />
  );
}
