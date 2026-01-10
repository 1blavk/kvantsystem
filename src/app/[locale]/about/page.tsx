import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import LazyImage from '@/src/components/LazyImage';
import ParticlesBg from '@/src/components/ParticlesBg';
import { teamData } from '../../data/teamData';
import { Instagram, MessageCircle } from 'lucide-react';

const iconMap = {
  Instagram,
  MessageCircle,
};

export async function generateMetadata({ params }: { params: Promise<{ locale: 'en' | 'uz' | 'ru' }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'META_DATA' });

  return {
    title: t('about_meta'),
    description: t('about_meta_description'),
    keywords: t('about_meta_description'),
  };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: 'en' | 'uz' | 'ru' }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'AboutPage' });


  return (
    <>

      <div className="h-[80vh] absolute w-full -z-10">
        <ParticlesBg type="cobweb" bg={true} num={40} color="#cccccc" />
      </div>


      <div className="pt-16">
        <p className="anime text-center bg-[#555] p-1 text-md font-regular text-white leading-8">
          🚀 {t('subtitle')} 🚀
        </p>
      </div>
      <div className="pt-24 max-w-7xl mx-auto px-6">

        <h1 className="font-bold text-2xl md:text-5xl text-[#333] text-center leading-14 md:leading-22 mb-6">
          {t('title')}
        </h1>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-32">
        <h1 className="uppercase text-center text-md font-bold text-gray-300 tracking-[2px]">{t('team_title')}</h1>

        <div className="mt-20">
          <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-4 grid-cols-2 md:gap-8 gap-4 mt-12 mb-32">

            {teamData.map((team) => (
              <div
                key={team.id}
                className="item  flex flex-col items-center"
              >
                <div className="flex justify-center bg-gray-100
                                    rounded-xl
                                    overflow-hidden
                                    border border-gray-200
                                    min-h-[100px] min-w-[100px]
                                    md:min-h-[200px] md:min-w-[200px]
                                ">
                  <LazyImage
                    w={200}
                    h={200}
                    src={team.avatar}
                    alt={team.name[locale as keyof typeof team.name]}
                  />
                </div>

                <div className="mt-4 text-center min-w-[125px] w-full max-w-[220px] bg-gray-50 px-4 py-3 rounded-xl">
                  <h1 className="text-lg font-medium mb-1 text-[#1E2E3E]">
                    {team.name[locale]}
                  </h1>

                  <p className="text-sm text-gray-500 mb-1">
                    {team.position[locale as keyof typeof team.position]}
                  </p>

                  <div className="h-0.5 w-full bg-gray-100"></div>

                  <div className="mt-2 flex justify-center gap-4">
                    {team.media?.map((mediaItem) => {
                      const IconComponent = iconMap[mediaItem._icon as keyof typeof iconMap];
                      return (
                        <a
                          key={mediaItem.id}
                          target="_blank"
                          href={mediaItem.link}
                          title={mediaItem.platform}
                          style={{
                            '--hover-color': mediaItem.color
                          } as React.CSSProperties}
                          className="text-sm text-shadow-2xs hover:font-medium text-gray-500 font-light hover:[color:var(--hover-color)]"
                        >
                          {IconComponent && <IconComponent size={20} />}
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>




      {/* <FeedbackSection /> */}
    </>
  );
}
