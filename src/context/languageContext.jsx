import { createContext, useContext, useState, useEffect } from "react";
import { translations } from "../i18n/index";

const LanguageContext = createContext();

const defaultLanguage = "uz_UZ";

// Map browser languages to your translation keys
const langMap = {
    "uz": "uz_UZ",
    "uz-uz": "uz_UZ",
    "ru": "ru_RU",
    "ru-ru": "ru_RU",
    "en": "en_US",
    "en-us": "en_US",
};

function detectBrowserLang() {
    const browserLang =
        navigator.languages?.[0] ||
        navigator.language ||
        navigator.userLanguage ||
        defaultLanguage;

    const normalized = browserLang.toLowerCase();

    return langMap[normalized] || langMap[normalized.split("-")[0]] || defaultLanguage;
}

export function LanguageProvider({ children }) {
    const getLangFromStorage = () => {
        const saved = localStorage.getItem("lang");
        if (saved) return saved; // already set by user

        // auto-detect for first-time visitors
        const autoDetected = detectBrowserLang();
        localStorage.setItem("lang", autoDetected);
        return autoDetected;
    };

    const [lang, setLang] = useState(getLangFromStorage);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        localStorage.setItem("lang", lang);
    }, [lang]);

    const value = {
        lang,
        setLang: (newLang) => {
            setLoading(true);
            setLang(newLang);
            setTimeout(() => setLoading(false), 2000);
        },
        translations: translations[lang],
        loading,
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    return useContext(LanguageContext);
}
