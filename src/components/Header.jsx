<<<<<<< HEAD
import { useEffect, useState } from "react";



// CONTEXTS
import { useLanguage } from "../context/languageContext";


// DATA
import { languages } from "../i18n/index";

// 3RD PARTY
import { X, Menu } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import LanguageSelector from "./LanguageSelector";
import clsx from "clsx";
import { tr } from "framer-motion/client";


export default function Header({ location }) {
    const [isWhite, setIsWhite] = useState(false);
    const [isOpen, setIsOpen] = useState(false)
    const { lang, setLang, translations } = useLanguage();

    const nav_links = [
        { to: "/", label: translations.navbar.home },
        { to: "/about", label: translations.navbar.about },
        { to: "/services", label: translations.navbar.services },
    ];
    const menuBtn = () => {
        setIsOpen(!isOpen)

        if (location.pathname === "/") setIsWhite(!isWhite)
    }

    useEffect(() => {
        if (location.pathname === "/") {
=======
'use client';
import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { usePathname } from 'next/navigation';
import { X, Menu } from "lucide-react";
import { Link } from "@/src/i18n/navigation";
import clsx from "clsx";
import LanguageSelector from "./LanguageSelector";


export default function Header() {
    const [isWhite, setIsWhite] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const t = useTranslations("Navbar");
    const locale = useLocale();
    const pathname = usePathname();

    const normalizePath = (p) => {
        if (!p) return '/';
        let clean = p;
        if (locale) {
            const prefix = `/${locale}`;
            if (clean === prefix) clean = '/';
            else if (clean.startsWith(prefix + '/')) clean = clean.slice(prefix.length);
        }
        if (!clean.startsWith('/')) clean = '/' + clean;
        return clean;
    }

    const cleanPath = normalizePath(pathname);

    const isLinkActive = (linkTo) => {
        if (!cleanPath) return false;
        if (linkTo === '/') return cleanPath === '/';
        return cleanPath === linkTo || cleanPath.startsWith(linkTo + '/');
    }

    const menuBtn = () => {
        setIsOpen(!isOpen)

        if (cleanPath === "/") setIsWhite(!isWhite)
    }

    useEffect(() => {
        if (cleanPath === "/") {
>>>>>>> 756f706 (alpha-version)
            setIsWhite(false);
        } else {
            setIsWhite(true);
        }
<<<<<<< HEAD
    }, [location.pathname]);
    return (
        <nav className={clsx("fixed w-full flex flex-col justify-between z-50",
            isWhite
                ? " bg-white/85 backdrop-blur-md shadow-2xl shadow-[#00000010] border-b-1 border-b-white"
                : null)
        }>


            <div className={"max-w-7xl mx-auto w-full flex justify-between items-center transition-all duration-400 ease " + (isWhite ? "p-4" : "p-6")}>
                <a className="flex gap-4 items-center" title={translations.navbar.home_meta}>
                    <img src="/logo.png" alt={translations.navbar.home_meta} className="w-[30px]" property="" />
=======
    }, [cleanPath]);

    const nav_links = [
        { to: "/", label: t('home') },
        { to: "/about", label: t("about") },
        { to: "/services", label: t("services") },
    ];


    return (
        <nav className={clsx("fixed w-full flex flex-col justify-between z-50",
            isWhite
                ? " bg-white backdrop-blur-md shadow-2xl shadow-[#00000010] border-b-1 border-b-white"
                : null)
        }>
            <div className={"max-w-7xl mx-auto w-full flex justify-between items-center transition-all duration-400 ease " + (isWhite ? "p-4" : "p-6")}>
                <Link
                    href="/"
                    className="flex gap-4 items-center"
                    title={t('home')}
                >
                    <img src="/logo.png" alt={t('home')} className="w-[30px]" property="" />
>>>>>>> 756f706 (alpha-version)
                    <h1
                        className={clsx(
                            "text-1xl  sm:text-1xl md:text-xl font-semibold uppercase ",
                            isWhite
                                ? "text-[#1E2E3E]"
                                : "text-[#FAFAFA]"
                        )}
                    >
                        Kvant System
                    </h1>
<<<<<<< HEAD
                </a>

=======
                </Link>
>>>>>>> 756f706 (alpha-version)
                <div className="flex items-center md:gap-16 sm:gap-3 gap-3">
                    <div className="hidden sm:hidden md:flex items-center gap-4">
                        {
                            nav_links.map((link, index) => (
<<<<<<< HEAD
                                <NavLink
                                    key={index}
                                    to={link.to}
                                    className={({ isActive }) =>
                                        clsx(
                                            "navlink font-light py-1 px-3 rounded-full transition duration-400 ease sm:text-sm md:text-md lg:text-md xl:text-md",

                                            // Active class
                                            isActive && "active",

                                            // Color variants
                                            isWhite
                                                ? "text-gray-800 hover:bg-[#eee] hover:text-gray-900"
                                                : "text-white hover:bg-white hover:text-gray-900"
                                        )
                                    }
                                >
                                    {link.label}
                                </NavLink>
=======
                                <Link
                                    key={index}
                                    href={link.to}
                                    className={clsx(
                                        "navlink font-light py-1 px-3 rounded-full transition duration-400 ease sm:text-sm md:text-md lg:text-md xl:text-md",
                                        isLinkActive(link.to) && "active",
                                        isWhite
                                            ? "text-gray-800 hover:bg-[#eee] hover:text-gray-900"
                                            : "text-white hover:bg-white hover:text-gray-900"
                                    )}
                                >
                                    {link.label}
                                </Link>
>>>>>>> 756f706 (alpha-version)
                            ))
                        }

                    </div>

                    <LanguageSelector isWhite={isWhite}></LanguageSelector>

                    <button
                        className={clsx("flex xl:hidden md:hidden sm:flex p-2 rounded-full transition duration-400 ease",
                            (isWhite ?
                                "hover:text-gray-900 hover:bg-[#eee] text-gray-900"
                                :
                                "hover:bg-white hover:text-gray-900 text-gray-50"
                            )
                        )}
                        onClick={() => menuBtn()}
                    >
                        {
                            isOpen
                                ?
                                <X
                                    size={18}
                                    strokeWidth={1}
                                />
                                :
                                <Menu
                                    size={16}
                                    strokeWidth={1}

                                />
                        }
                    </button>
                </div>
<<<<<<< HEAD

=======
>>>>>>> 756f706 (alpha-version)
            </div>

            {isOpen ?
                <div className={"flex sm:flex md:hidden items-center gap-4 max-w-7xl mx-auto w-full flex justify-between items-center transition-all duration-400 ease p-4"}
                >
                    <div className="w-full  flex flex-col gap-4 mb-4">
                        {
                            nav_links.map((link, index) => (
<<<<<<< HEAD
                                <NavLink
                                    onClick={() => menuBtn()}
                                    key={index}
                                    to={link.to}
                                    className={({ isActive }) =>
                                        clsx(
                                            "w-full font-light py-4 text-center px-3 rounded-md transition duration-400 ease sm:text-sm md:text-md lg:text-md xl:text-md",

                                            // Active class
                                            isActive && "bg-[#01C38E] font-bold"
                                        )
                                    }
                                >
                                    {link.label}
                                </NavLink>
=======
                                <Link
                                    onClick={() => menuBtn()}
                                    key={index}
                                    href={link.to}
                                    className={clsx("w-full font-light py-4 text-center px-3 rounded-md transition duration-400 ease sm:text-sm md:text-md lg:text-md xl:text-md",
                                        isLinkActive(link.to) && "bg-[#01C38E] font-bold"
                                    )}
                                >
                                    {link.label}
                                </Link>
>>>>>>> 756f706 (alpha-version)
                            ))
                        }
                    </div>
                </div>
                :
                null
            }
<<<<<<< HEAD


        </nav >
=======
        </nav>
>>>>>>> 756f706 (alpha-version)
    );
}