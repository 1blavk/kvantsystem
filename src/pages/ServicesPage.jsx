import { CirclePlus, MonitorCog, Store } from "lucide-react";
import { Helmet } from "react-helmet-async";
import ServiceCard from "../components/ServiceCard";
import { Link, Routes, Route } from "react-router-dom";
import UnderConstruction from "../components/UnderConstruction";

export default function ServicesPage({ t, loc }) {

    const base = "text-sm cursor-pointer flex items-center gap-2 border-2 border-dashed rounded-full p-2 px-4 border-white/20 transition";
    const active = "bg-white/10 text-white";
    const inactive = "text-white/50 hover:bg-white/10";

    return (
        <>
            <Helmet>
                <title>{t.navbar.services_meta}</title>
            </Helmet>

            <div className="pt-17">
                <div className="pt-20 pb-20 mx-auto px-6 bg-[#1E2E3E]">
                    <h1 className="font-bold uppercase text-4xl md:text-6xl sm:text-4xl text-center leading-12 mb-8 bg-gradient-to-t to-[#0EA37F] from-[#01C38E50] text-transparent bg-clip-text">
                        {loc.pathname === "/services"
                            ? "Services"
                            : loc.pathname === "/services/store"
                                ? "Store"
                                : loc.pathname === "/services/calculate"
                                    ? "Calculate"
                                    : "Services"
                        }
                    </h1>

                    <p className="mb-16 text-center text-xl max-w-[600px] text-shadow-2xs text-shadow-amber-100 mx-auto font-medium text-white/40 leading-10">
                        Kvant System delivers devices and digital solutions that help businesses launch, secure, and grow in today’s connected world.
                    </p>

                    <div className="flex flex-wrap gap-4 sm:gap-4 md:gap-10 justify-center px-4">

                        {/* SERVICES */}
                        <Link
                            to="/services"
                            className={`${base} ${loc.pathname === "/services" ? active : inactive}`}
                        >
                            <MonitorCog size={16} strokeWidth={1} />
                            <span>Services</span>
                        </Link>

                        {/* STORE */}
                        <Link
                            to="/services/store"
                            className={`${base} ${loc.pathname.startsWith("/services/store") ? active : inactive
                                }`}
                        >
                            <Store size={16} strokeWidth={1} />
                            <span>Store</span>
                        </Link>

                        {/* CALCULATE */}
                        <Link
                            to="/services/calculate"
                            className={`${base} ${loc.pathname.startsWith("/services/calculate") ? active : inactive
                                }`}
                        >
                            <CirclePlus strokeWidth={1} size={16} />
                            <span>Calculate</span>
                            <span>|</span>
                            <div className="bg-white px-2 py-0.5 rounded-full">
                                <p className="text-[11px] font-bold bg-gradient-to-l to-rose-500 from-orange-500 text-transparent bg-clip-text">
                                    12
                                </p> 
                            </div>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Nested Routes */}
            <Routes>
                <Route index element={<ServicesSection />} />
                <Route path="/store" element={<StoreSection />} />
                <Route path="/calculate" element={<CalculateSection />} />
            </Routes>
        </>
    );
}


export const ServicesSection = () => {
    return (
        <div className="mt-20 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 px-4 mx-auto max-w-7xl pb-20">
            {[...Array(5)].map((_, idx) => (
                <div key={idx} className="p-0 md:p-8 sm:p-0">
                    <ServiceCard />
                </div>
            ))}
        </div>
    )
};

export const StoreSection = () => {
    return (
        <>
            <Helmet>
                <title>{"KS - Stores 🏪"}</title>
            </Helmet>


            <UnderConstruction></UnderConstruction>
        </>
    )
};

export const CalculateSection = () => {
    return (
        <>
            <Helmet>
                <title>{"KS - Calculation 🧮"}</title>
            </Helmet>


            <UnderConstruction></UnderConstruction>
        </>
    )
};