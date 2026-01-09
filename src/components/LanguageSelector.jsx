import { useState, useRef, useEffect } from "react";
import { languages } from "../i18n/index";
import { useLanguage } from "../context/languageContext";
import { ChevronDown, Languages } from "lucide-react";

export default function LanguageSelector({ isWhite }) {
    const { lang, setLang } = useLanguage();
    const [open, setOpen] = useState(false);
    const ref = useRef();

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const currentLanguage = languages.find((l) => l.code === lang);

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

                <span>{currentLanguage?.name}</span>

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
                        onClick={() => {
                            setLang(l.code);
                            setOpen(false);
                        }}
                        className={`w-full text-left cursor-pointer px-4 py-2 font-extralight text-sm text-gray-800 hover:bg-[#eee] transition-colors duration-200 ${lang === l.code ? "font-semibold" : "font-normal"
                            }`}
                    >
                        {l.name}
                    </button>
                ))}
            </div>
        </div>
    );
}