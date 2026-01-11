'use client';

import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { usePathname, useRouter } from 'next/navigation';
import {
    Phone,
    Home,
    Info,
    Briefcase,
    Languages,
} from "lucide-react";
import clsx from "clsx";
import { Link } from "@/src/i18n/navigation";
import LanguageSelector from "./LanguageSelector";

export default function Header() {
    const [isWhite, setIsWhite] = useState(false);
    const [mobileLangOpen, setMobileLangOpen] = useState(false);

    const t = useTranslations("Navbar");
    const locale = useLocale();
    const pathname = usePathname();
    const router = useRouter();

    const normalizePath = (p: string | null | undefined): string => {
        if (!p) return '/';
        let clean = p;
        const prefix = `/${locale}`;
        if (clean === prefix) clean = '/';
        else if (clean.startsWith(prefix + '/')) clean = clean.slice(prefix.length);
        if (!clean.startsWith('/')) clean = '/' + clean;
        return clean;
    };

    const cleanPath = normalizePath(pathname);

    const isLinkActive = (linkTo: string): boolean => {
        if (linkTo === '/') return cleanPath === '/';
        return cleanPath === linkTo || cleanPath.startsWith(linkTo + '/');
    };

    useEffect(() => {
        if (cleanPath === "/") setIsWhite(false);
        else setIsWhite(true);
    }, [cleanPath]);

    const nav_links = [
        { to: "/", label: t('home'), icon: Home },
        { to: "/about", label: t("about"), icon: Info },
        { to: "/services", label: t("services"), icon: Briefcase },
    ];

    const availableLocales = [
        { code: "en", label: "English" },
        { code: "uz", label: "O‘zbek" },
        { code: "ru", label: "Русский" },
    ];

    return (
        <>
            {/* ================= PC NAVBAR ================= */}
            <nav
                className={clsx(
                    "pc fixed sm:hidden md:flex w-full flex-col justify-between z-50",
                    isWhite ? "bg-white backdrop-blur-md shadow-2xl shadow-[#00000010] border-b border-white" : null
                )}
            >
                <div className={"max-w-7xl mx-auto w-full flex justify-between items-center transition-all duration-400 ease " + (isWhite ? "p-4" : "p-6")}>
                    <Link href="/" className="flex gap-4 items-center">
                        <img src="/logo.png" alt="Logo" className="w-[30px]" />
                        <h1 className={clsx("text-xl font-semibold uppercase", isWhite ? "text-[#1E2E3E]" : "text-[#FAFAFA]")}>
                            Kvant System
                        </h1>
                    </Link>

                    <div className="flex items-center gap-6">
                        <div className="hidden md:flex items-center gap-4">
                            {nav_links.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.to}
                                    className={clsx(
                                        "navlink font-thin text-sm py-1 px-4 rounded-full transition",
                                        isLinkActive(link.to) && "active",
                                        isWhite
                                            ? "text-gray-800 hover:bg-[#eee]"
                                            : "text-white hover:bg-white hover:text-gray-900"
                                    )}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>

                        <Link
                            href="tel:+998900650095"
                            className={clsx(
                                "p-2 rounded-full transition",
                                isWhite ? "text-gray-900 hover:bg-[#eee]" : "text-white hover:bg-white hover:text-gray-900"
                            )}
                        >
                            <Phone size={16} />
                        </Link>

                        <div className=" hidden md:block">
                            <LanguageSelector isWhite={isWhite} />
                        </div>
                    </div>
                </div>
            </nav>

            {/* ================= MOBILE NAVBAR ================= */}
            <nav className="mobile fixed bottom-0 left-0 z-50 w-full sm:flex md:hidden bg-[#1E2E3E] border-t border-white/10">
                <div className="flex justify-around items-center w-full py-2">
                    {nav_links.map((link, index) => {
                        const Icon = link.icon;
                        const active = isLinkActive(link.to);

                        return (
                            <Link
                                key={index}
                                href={link.to}
                                className={clsx(
                                    "flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-xl transition-all duration-300",
                                    active ? "text-[#01C38E]" : "text-gray-300 hover:text-white"
                                )}
                            >
                                <Icon size={20} />
                                <span className={clsx("text-[11px]", active && "font-semibold")}>
                                    {link.label}
                                </span>
                                {active && <span className="w-1 h-1 rounded-full bg-[#01C38E]" />}
                            </Link>
                        );
                    })}

                    {/* Language button */}
                    <button
                        onClick={() => setMobileLangOpen(true)}
                        className="flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-xl text-gray-300 hover:text-white transition-all duration-300"
                    >
                        <Languages size={20} />
                        <span className="text-[11px]">
                            {t('language')}
                        </span>
                    </button>
                </div>
            </nav>


            {mobileLangOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
                    onClick={() => setMobileLangOpen(false)}
                >
                    <div
                        className="bg-white dark:bg-[#1E2E3E] rounded-xl w-64 p-4 flex flex-col gap-3"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 text-center">
                            {t('change_language')}
                        </h2>

                        {availableLocales.map((loc) => (
                            <button
                                key={loc.code}
                                onClick={() => {
                                    // Build the new path
                                    const newPath =
                                        cleanPath === "/"
                                            ? `/${loc.code}`
                                            : `/${loc.code}${cleanPath}`;
                                    router.push(newPath);       // navigate to new language
                                    setMobileLangOpen(false);   // close modal
                                }}
                                className={clsx(
                                    "px-3 py-2 rounded-lg hover:bg-[#01C38E]/20 transition text-gray-800 dark:text-gray-200 text-center",
                                    loc.code === locale ? "font-bold text-[#01C38E]" : "font-normal"
                                )}
                            >
                                {loc.label}
                            </button>
                        ))}

                        <button
                            onClick={() => setMobileLangOpen(false)}
                            className="mt-2 px-3 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                        >
                            {t('close')}
                        </button>
                    </div>
                </div>
            )}

        </>
    );
}
