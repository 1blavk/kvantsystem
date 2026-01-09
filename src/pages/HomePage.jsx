import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import LazyImage from "../components/LazyImage.jsx";
import SEO from "../components/SEO.jsx";

export default function HomePage({ t }) {
    return (
        <>
            <SEO
                title="Kvant System — Digital Solutions & Devices"
                description="We deliver digital solutions, devices, and IT services that help businesses grow, secure, and automate their operations."
                url="https://kvant-system.vercel.app/"
                image="https://kvant-system.vercel.app/og-image.png"
            />

            <Helmet>
                <title>{t.navbar.home_meta}</title>
            </Helmet>

            <main className="hero w-full min-h-screen py-20 px-4">
                <div className="max-w-7xl md:mt-2 sm:mt-10 mt-10 mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center">

                    {/* LEFT — IMAGE */}
                    <div className="relative min-h-32 md:top-20 flex justify-center order-1 md:order-none">
                        <LazyImage
                            src="/server-card.png"
                            alt="Server card"
                            className="
                                max-w-[100%]
                                sm:max-w-[70%] 
                                md:max-w-[550px]
                                md:-rotate-3 
                                hover:rotate-0 
                                transition-all duration-700 ease
                            "
                            loaderColor="#ddd"
                        />
                    </div>

                    {/* RIGHT — TEXT CONTENT */}
                    <div className="text-center flex flex-col items-center">
                        <h1 className="text-3xl sm:text-4xl md:text-4xl font-semibold text-gray-200 leading-tight">
                            {t.home.welcome}
                        </h1>

                        <p
                            className="text-base sm:text-lg md:text-md mt-6 mb-10 text-white/60 leading-relaxed max-w-xl"
                            dangerouslySetInnerHTML={{ __html: t.home.welcome_sub }}
                        />

                        <Link
                            to="/services"
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
                            {t.home.explore_services}
                        </Link>
                    </div>
                </div>
            </main>
        </>
    );
}
