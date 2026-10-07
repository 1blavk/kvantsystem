'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LazyImage from '@/src/components/LazyImage';
import { Link } from '@/src/i18n/navigation';
import { ServiceDataType, servicesData } from '@/src/app/data/servicesData';
import { teamData } from '@/src/app/data/teamData';
import { ArrowRight, ShieldCheck, Zap, Award, Users } from 'lucide-react';

interface HomePageAnimationsProps {
  locale: string;
  tExploreServices: string;
  tLearnMore: string;
  tServicesTitle: string;
  tServicesSubtitle: string;
  tTeamTitle: string;
  tWhyChooseUs: string;
  tWhyChooseUsSubtitle: string;
}

export default function HomePageAnimations({
  locale,
  tExploreServices,
  tLearnMore,
  tServicesTitle,
  tServicesSubtitle,
  tTeamTitle,
  tWhyChooseUs,
  tWhyChooseUsSubtitle,
}: HomePageAnimationsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Hero floating / subtle parallax effect
      const heroImg = document.querySelector('.hero-image-wrap');
      const heroSec = document.querySelector('.hero-section');
      if (heroImg && heroSec) {
        gsap.to(heroImg, {
          y: -25,
          ease: 'none',
          scrollTrigger: {
            trigger: heroSec,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.2,
          },
        });
      }

      // 2. Feature highlights section reveal
      gsap.fromTo(
        '.feature-card',
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.features-grid',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      // 3. Featured services cards stagger reveal
      gsap.fromTo(
        '.service-scroll-card',
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.services-preview-grid',
            start: 'top 82%',
            toggleActions: 'play none none none',
          },
        }
      );

      // 4. Statistics counter animation
      gsap.fromTo(
        '.stat-box',
        { opacity: 0, scale: 0.9, y: 25 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: 'back.out(1.4)',
          scrollTrigger: {
            trigger: '.stats-section',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      // 5. Team preview cards reveal
      gsap.fromTo(
        '.team-preview-card',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.team-preview-grid',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      ScrollTrigger.refresh();
    }, containerRef);

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, [locale]);

  const topServices = servicesData.slice(0, 4);
  const coreTeam = teamData.slice(0, 4);

  return (
    <div ref={containerRef} className="w-full mt-8 sm:mt-62">
      {/* WHY CHOOSE US / FEATURES HIGHLIGHT */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold tracking-widest uppercase bg-[#01C38E]/10 text-[#01C38E] px-3 py-1 rounded-full border border-[#01C38E]/20">
            {tWhyChooseUs}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mt-4">
            {tWhyChooseUsSubtitle}
          </h2>
        </div>

        <div className="features-grid grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="feature-card bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
            <div className="w-12 h-12 rounded-xl bg-[#1E2E3E] text-[#01C38E] flex items-center justify-center mb-5">
              <Zap size={24} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {locale === 'uz' ? 'Tezkor o‘rnatish va moslash' : locale === 'ru' ? 'Быстрая установка и настройка' : 'Rapid Setup & Deployment'}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {locale === 'uz'
                ? 'Eng zamonaviy uskunalar bilan qisqa muddatlarda sifatli xizmat ko‘rsatish kafolati.'
                : locale === 'ru'
                ? 'Гарантия качественного обслуживания в кратчайшие сроки с использованием новейшего оборудования.'
                : 'Turnkey enterprise IT infrastructure deployed on schedule with guaranteed quality.'}
            </p>
          </div>

          <div className="feature-card bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
            <div className="w-12 h-12 rounded-xl bg-[#1E2E3E] text-[#01C38E] flex items-center justify-center mb-5">
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {locale === 'uz' ? 'Xavfsizlik va Kafolat' : locale === 'ru' ? 'Надежность и безопасность' : 'Certified Reliability'}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {locale === 'uz'
                ? '24/7 nazorat, uzluksiz texnik yordam va to‘liq rasmiy servis kafolati.'
                : locale === 'ru'
                ? 'Круглосуточный мониторинг, непрерывная техническая поддержка и официальная гарантия.'
                : '24/7 technical monitoring, rigorous security adherence, and dedicated manufacturer warranty.'}
            </p>
          </div>

          <div className="feature-card bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
            <div className="w-12 h-12 rounded-xl bg-[#1E2E3E] text-[#01C38E] flex items-center justify-center mb-5">
              <Award size={24} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {locale === 'uz' ? 'Malakali Mutaxassislar' : locale === 'ru' ? 'Опытные специалисты' : 'Certified Engineers'}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {locale === 'uz'
                ? 'Ko‘p yillik amaliy tajribaga ega sertifikatlangan muhandislar jamoasi.'
                : locale === 'ru'
                ? 'Команда сертифицированных инженеров с многолетним практическим опытом.'
                : 'Over 8 years of cross-industry engineering experience with high-scale enterprise rollouts.'}
            </p>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="stats-section bg-[#1E2E3E] text-white py-14 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="stat-box p-4">
            <div className="text-3xl md:text-5xl font-bold text-[#01C38E] mb-1">12+</div>
            <div className="text-xs md:text-sm text-gray-300 uppercase tracking-wider">
              {locale === 'uz' ? 'IT Xizmatlar' : locale === 'ru' ? 'IT Услуг' : 'Specialized Services'}
            </div>
          </div>
          <div className="stat-box p-4">
            <div className="text-3xl md:text-5xl font-bold text-[#01C38E] mb-1">500+</div>
            <div className="text-xs md:text-sm text-gray-300 uppercase tracking-wider">
              {locale === 'uz' ? 'Bajarilgan Loyihalar' : locale === 'ru' ? 'Завершенных Проектов' : 'Completed Projects'}
            </div>
          </div>
          <div className="stat-box p-4">
            <div className="text-3xl md:text-5xl font-bold text-[#01C38E] mb-1">99.8%</div>
            <div className="text-xs md:text-sm text-gray-300 uppercase tracking-wider">
              {locale === 'uz' ? 'Mijozlar Mamnuniyati' : locale === 'ru' ? 'Довольных Клиентов' : 'Client Satisfaction'}
            </div>
          </div>
          <div className="stat-box p-4">
            <div className="text-3xl md:text-5xl font-bold text-[#01C38E] mb-1">24/7</div>
            <div className="text-xs md:text-sm text-gray-300 uppercase tracking-wider">
              {locale === 'uz' ? 'Texnik Qo‘llab-quvvatlash' : locale === 'ru' ? 'Техподдержка' : 'Dedicated Support'}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED SERVICES PREVIEW */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1E2E3E]">
              {tServicesTitle}
            </h2>
            <p className="text-gray-500 mt-2 max-w-xl">
              {tServicesSubtitle}
            </p>
          </div>
          <Link
            href="/services"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-sm font-semibold text-[#0EA37F] hover:text-[#01C38E] transition"
          >
            <span>{tExploreServices}</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="services-preview-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {topServices.map((service: ServiceDataType, i) => (
            <div
              key={service.id || i}
              className="service-scroll-card bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg p-4 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="bg-[#f7f8f9] rounded-xl overflow-hidden flex items-center justify-center p-4 mb-4">
                  <LazyImage
                    w={300}
                    h={180}
                    src={service.photo}
                    alt={service.title[locale as keyof typeof service.title] || 'Service'}
                  />
                </div>
                <h3 className="font-semibold text-gray-900 text-base mb-1 line-clamp-1">
                  {service.title[locale as keyof typeof service.title]}
                </h3>
                <span className="inline-block text-xs font-medium text-orange-600 bg-orange-100 px-2 py-0.5 rounded-full mb-3">
                  {service.spend[locale as keyof typeof service.spend]}
                </span>
              </div>
              <Link
                href="/services"
                className="mt-3 w-full py-2 text-center text-xs font-medium text-[#1E2E3E] bg-gray-100 hover:bg-[#01C38E] hover:text-gray-950 rounded-lg transition"
              >
                {tLearnMore}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* TEAM PREVIEW SECTION */}
      <section className="py-16 px-6 max-w-7xl mx-auto bg-gray-50 rounded-3xl mb-12">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
            <Users size={16} />
            <span>{tTeamTitle}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            {locale === 'uz' ? 'Bizning Mutaxassislar' : locale === 'ru' ? 'Наша Команда' : 'Meet Our Experts'}
          </h2>
        </div>

        <div className="team-preview-grid grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {coreTeam.map((member) => (
            <div
              key={member.id}
              className="team-preview-card bg-white p-4 rounded-xl border border-gray-100 shadow-sm text-center flex flex-col items-center"
            >
              <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 mb-3 border-2 border-emerald-100">
                <LazyImage
                  w={96}
                  h={96}
                  src={member.avatar}
                  alt={member.name[locale as keyof typeof member.name]}
                />
              </div>
              <h3 className="font-semibold text-sm text-gray-900">
                {member.name[locale as keyof typeof member.name]}
              </h3>
              <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                {member.position[locale as keyof typeof member.position]}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#1E2E3E] hover:text-[#01C38E] transition"
          >
            <span>{locale === 'uz' ? 'Barcha mutaxassislar' : locale === 'ru' ? 'Все специалисты' : 'View all team members'}</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
