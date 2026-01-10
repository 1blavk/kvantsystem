'use client'

import { Languages } from "lucide-react";
import { useEffect, useRef, useState, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useLocale } from "next-intl";

interface LanguageSelectorProps {
    isWhite: boolean;
}

export default function LanguageSelector({ isWhite }: LanguageSelectorProps) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const pathname = usePathname();
    const locale = useLocale();

    const languages = [
        { code: "en", name: "English" },
        { code: "ru", name: "Русский" },
        { code: "uz", name: "Oʻzbekcha" },
    ];

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const currentLanguage = languages.find((l) => l.code === locale);

    const handleLanguageChange = (newLang: string) => {
        // Remove current locale prefix and add new one
        const pathWithoutLocale = pathname.replace(`/${locale}`, "") || "/";
        const newPath = newLang === "/en" ? pathWithoutLocale : `/${newLang}${pathWithoutLocale}`;
        router.push(newPath);
        setOpen(false);
    };

    return (
        <div ref={ref} className="relative inline-block text-left">
            {/* Trigger Button */}
            <button className={
                "cursor-pointer sm:text-sm md:text-md lg:text-md xl:text-md flex gap-2 items-center font-light py-1 px-3 rounded-full transition duration-400 ease"
                +
                (isWhite ?
                    (open ? " bg-[#eee]" : " hover:bg-[#eee] hover:text-gray-900")
                    :
                    (open ? " bg-white text-gray-900" : " text-white hover:bg-white hover:text-gray-900")
                )


            }


                onClick={() => setOpen(!open)}
            >

                <span className="hidden sm:flex">{currentLanguage?.name}</span>

                <Languages size={16} strokeWidth={1} />
            </button>


            {/* Dropdown */}
            <div
                className={`
          absolute right-0 mt-2 w-30  bg-white border border-gray-300 rounded shadow-lg z-50
          transform transition-all duration-200 ease-out
          ${open ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
            >
                {languages.map((l) => (
                    <button
                        key={l.code}
                        onClick={() => handleLanguageChange(l.code)}
                        className={`w-full text-left cursor-pointer px-4 py-2 font-extralight text-sm text-gray-800 hover:bg-[#eee] transition-colors duration-200 ${locale === l.code ? "font-semibold" : "font-normal"
                            }`}
                    >
                        {l.name}
                    </button>
                ))}
            </div>
        </div>
    );
}