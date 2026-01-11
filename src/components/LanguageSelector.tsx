'use client';

import { Languages } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import clsx from "clsx";

interface Props {
    isWhite?: boolean;
    mobile?: boolean;
    onClose?: () => void;
}

const languages = [
    { code: "en", name: "English" },
    { code: "ru", name: "Русский" },
    { code: "uz", name: "Oʻzbekcha" },
];

export default function LanguageSelector({ isWhite = false, mobile = false, onClose }: Props) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const pathname = usePathname();
    const locale = useLocale();

    const currentLanguage = languages.find((l) => l.code === locale);

    // Close dropdown/modal on outside click
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLanguageChange = (newLang: string) => {
        const pathWithoutLocale = pathname.startsWith(`/${locale}`)
            ? pathname.slice(locale.length + 1) || "/"
            : pathname;
        const newPath = `/${newLang}${pathWithoutLocale.startsWith("/") ? pathWithoutLocale : "/" + pathWithoutLocale}`;
        router.push(newPath);
        setOpen(false);
        onClose?.();
    };

    // Render button and dropdown for desktop
    if (!mobile) {
        return (
            <div ref={ref} className="relative inline-block text-left">
                <button
                    onClick={() => setOpen(!open)}
                    className={clsx(
                        "cursor-pointer flex gap-2 items-center font-light py-1 px-3 rounded-full transition duration-400 ease",
                        isWhite
                            ? open ? "bg-[#eee]" : "hover:bg-[#eee] hover:text-gray-900"
                            : open ? "bg-white text-gray-900" : "text-white hover:bg-white hover:text-gray-900"
                    )}
                >
                    <span className="hidden sm:flex  text-sm font-light">{currentLanguage?.name}</span>
                    <Languages size={16} />
                </button>

                <div className={clsx(
                    "absolute right-0 mt-2 w-32 bg-white border border-gray-300 rounded shadow-lg z-50 transition-all duration-200 ease-out",
                    open ? "opacity-100" : "opacity-0 pointer-events-none"
                )}>
                    {languages.map((l) => (
                        <button
                            key={l.code}
                            onClick={() => handleLanguageChange(l.code)}
                            className={clsx(
                                "w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-[#eee]",
                                locale === l.code ? "font-semibold" : "font-normal"
                            )}
                        >
                            {l.name}
                        </button>
                    ))}
                </div>
            </div>
        );
    }

    // Mobile modal
    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-xl text-gray-300 hover:text-white transition-all duration-300"
            >
                <Languages size={20} />
                <span className="text-[11px] text-gray-300">Lang</span>
            </button>

            {open && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
                    onClick={() => setOpen(false)}
                >
                    <div
                        className="bg-white dark:bg-[#1E2E3E] rounded-xl w-64 p-4 flex flex-col gap-3"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Select Language</h2>
                        {languages.map((l) => (
                            <button
                                key={l.code}
                                onClick={() => handleLanguageChange(l.code)}
                                className={clsx(
                                    "px-3 py-2 rounded-lg hover:bg-[#01C38E]/20 transition text-gray-800 dark:text-gray-200",
                                    locale === l.code ? "font-bold text-[#01C38E]" : "font-normal"
                                )}
                            >
                                {l.name}
                            </button>
                        ))}
                        <button
                            onClick={() => setOpen(false)}
                            className="mt-2 px-3 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
