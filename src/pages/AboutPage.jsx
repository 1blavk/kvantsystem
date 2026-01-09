import { Helmet } from "react-helmet-async";
import ParticlesBg from "particles-bg";
import LazyImage from "../components/LazyImage";


import FeedbackSection from "../components/FeedbackSection";
import { teamData } from "../data/teamData";
import { clsx } from "clsx";

export default function AboutPage({ t, lang }) {


    return (
        <>
            <Helmet>
                <title>{t.navbar.about_meta}</title>
            </Helmet>

            <div className="h-[80vh] absolute w-full -z-10">
                <ParticlesBg type="cobweb" bg={true} num={40} color="#cccccc" />
            </div>
            <div className="pt-42 max-w-4xl mx-auto px-6">
                <h1 className="font-medium text-3xl text-center leading-12 mb-6">
                    {t.about.title}
                </h1>

                <p className="text-center text-md font-semibold text-black/40 leading-8">
                    {t.about.subtitle}
                </p>
            </div>


            <div className="max-w-7xl mx-auto px-6 mt-32">
                <h1 className="uppercase text-center text-md font-bold text-gray-300 tracking-[2px]">Meet our Team</h1>

                <div className="mt-20">
                    <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-4 grid-cols-2 md:gap-8 gap-4 mt-12 mb-32">

                        {teamData.map((team) => (
                            <div
                                key={team.id}
                                className="item  flex flex-col items-center"
                            >
                                <div className="flex justify-center bg-gray-100 rounded-xl
                                    
                                    min-h-[100px] min-w-[100px]
                                    md:min-h-[200px] md:min-w-[200px]
                                ">
                                    <LazyImage
                                        src={team.avatar}
                                        alt={team.name[lang]}
                                    />
                                </div>

                                <div className="mt-4 text-center min-w-[125px] w-full max-w-[220px] bg-gray-50 px-4 py-3 rounded-xl">
                                    <h2 className="text-lg font-medium mb-1 text-[#1E2E3E]">
                                        {team.name[lang]}
                                    </h2>

                                    <p className="text-sm text-gray-500 mb-1">
                                        {team.position[lang]}
                                    </p>

                                    <div className="h-0.5 w-full bg-gray-100"></div>

                                    <div className="mt-2 flex justify-center gap-2">
                                        {team.media?.map((mediaItem) => (
                                            <a
                                                key={mediaItem.id}
                                                target="_blank"
                                                href={mediaItem.link}
                                                style={{
                                                    '--hover-color': mediaItem.color
                                                }}
                                                className="text-sm text-shadow-2xs hover:font-medium text-gray-500 font-light hover:[color:var(--hover-color)]"
                                            >
                                                {mediaItem.platform}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>




            <FeedbackSection />
        </>
    );
}