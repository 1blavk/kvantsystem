import { LocalizedString } from "./types"

export type PricingCriteria = {
    name: string; // e.g., "Basic", "Pro"
    value: string; // e.g., "1 server"
    price: string; // e.g., "$100"
};

export type ServiceDataType = {
    id: number;
    slug: string;
    keywords: string[];
    title: LocalizedString;
    spend: LocalizedString;
    pricing_criterias: {
        en: PricingCriteria[];
        uz: PricingCriteria[];
        ru: PricingCriteria[];
    };
    photo: string;
};


export const servicesData: ServiceDataType[] = [
    {
        id: 1,
        slug: "cctv",
        keywords: ["server installation", "office security", "IT services Uzbekistan"],
        title: { en: "CCTV Installation", uz: "Kamera O‘rnatish", ru: "Установка видеонаблюдения" },
        spend: { en: "1-4 days", uz: "1-4 kun", ru: "1-4 дня" },
        pricing_criterias: {
            en: [{ name: "Basic", value: "1 server", price: "$100" }, { name: "Pro", value: "Up to 5 servers", price: "$400" }],
            uz: [{ name: "Asosiy", value: "1 server", price: "$100" }, { name: "Pro", value: "5 servergacha", price: "$400" }],
            ru: [{ name: "Базовый", value: "1 сервер", price: "$100" }, { name: "Про", value: "До 5 серверов", price: "$400" }],
        },
        photo: "/__services/cctv.png",
    },
    {
        id: 2,
        slug: "server",
        keywords: ["server installation", "office security", "IT services Uzbekistan"],
        title: { en: "Server Installation", uz: "Server O‘rnatish", ru: "Установка сервера" },
        spend: { en: "3-7 days", uz: "3-7 kun", ru: "3-7 дня" },
        pricing_criterias: {
            en: [{ name: "Basic", value: "1 server", price: "$100" }, { name: "Pro", value: "Up to 5 servers", price: "$400" }],
            uz: [{ name: "Asosiy", value: "1 server", price: "$100" }, { name: "Pro", value: "5 servergacha", price: "$400" }],
            ru: [{ name: "Базовый", value: "1 сервер", price: "$100" }, { name: "Про", value: "До 5 серверов", price: "$400" }],
        },
        photo: "/__services/server.png",
    }
];
