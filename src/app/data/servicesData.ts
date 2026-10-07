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
        keywords: ["cctv", "security camera", "videokuzatuv", "videonablyudenie", "IP camera", "Hikvision", "Dahua"],
        title: { en: "CCTV Installation", uz: "Videokuzatuv o‘rnatish", ru: "Установка видеонаблюдения" },
        spend: { en: "1-3 days", uz: "1-3 kun", ru: "1-3 дня" },
        pricing_criterias: {
            en: [{ name: "Basic", value: "4 cameras", price: "$150" }, { name: "Pro", value: "16 cameras", price: "$500" }],
            uz: [{ name: "Asosiy", value: "4 ta kamera", price: "$150" }, { name: "Pro", value: "16 tagacha kamera", price: "$500" }],
            ru: [{ name: "Базовый", value: "4 камеры", price: "$150" }, { name: "Про", value: "До 16 камер", price: "$500" }],
        },
        photo: "/__services/cctv.png",
    },
    {
        id: 2,
        slug: "server",
        keywords: ["server installation", "datacenter", "server ornatish", "ustanovka serverov", "Dell", "HP"],
        title: { en: "Server Installation", uz: "Server o‘rnatish", ru: "Установка серверов" },
        spend: { en: "2-5 days", uz: "2-5 kun", ru: "2-5 дней" },
        pricing_criterias: {
            en: [{ name: "Basic", value: "1 server", price: "$200" }, { name: "Enterprise", value: "Full rack setup", price: "$800" }],
            uz: [{ name: "Asosiy", value: "1 ta server", price: "$200" }, { name: "Korporativ", value: "To‘liq stoyka sozlash", price: "$800" }],
            ru: [{ name: "Базовый", value: "1 сервер", price: "$200" }, { name: "Корпоративный", value: "Полная стойка", price: "$800" }],
        },
        photo: "/__services/server.png",
    },
    {
        id: 3,
        slug: "network",
        keywords: ["network installation", "tarmoq ornatish", "montaj setey", "LAN", "cabling", "switch", "patch panel"],
        title: { en: "Network Installation", uz: "Tarmoq o‘rnatish", ru: "Монтаж сетей" },
        spend: { en: "1-4 days", uz: "1-4 kun", ru: "1-4 дня" },
        pricing_criterias: {
            en: [{ name: "Office", value: "Up to 24 ports", price: "$150" }, { name: "Enterprise", value: "Up to 96 ports", price: "$450" }],
            uz: [{ name: "Ofis", value: "24 ta portgacha", price: "$150" }, { name: "Korporativ", value: "96 ta portgacha", price: "$450" }],
            ru: [{ name: "Офис", value: "До 24 портов", price: "$150" }, { name: "Корпоративный", value: "До 96 портов", price: "$450" }],
        },
        photo: "/__services/network.jpg",
    },
    {
        id: 4,
        slug: "access-control",
        keywords: ["access control", "kirishni nazorat qilish", "SKUD", "turniket", "biometrika", "RFID", "face id"],
        title: { en: "Access Control", uz: "Kirishni nazorat qilish", ru: "Система контроля доступа" },
        spend: { en: "1-3 days", uz: "1-3 kun", ru: "1-3 дня" },
        pricing_criterias: {
            en: [{ name: "Standard", value: "1-2 doors", price: "$120" }, { name: "Multi-point", value: "Turnstiles & Biometrics", price: "$380" }],
            uz: [{ name: "Standart", value: "1-2 eshik", price: "$120" }, { name: "Ko‘p nuqtali", value: "Turniket va biometrika", price: "$380" }],
            ru: [{ name: "Стандарт", value: "1-2 двери", price: "$120" }, { name: "Комплексный", value: "Турникеты и биометрия", price: "$380" }],
        },
        photo: "/__services/access-control.jpg",
    },
    {
        id: 5,
        slug: "intercom",
        keywords: ["intercom systems", "domofon tizimlari", "domofonnye sistemy", "video doorbell", "IP domofon"],
        title: { en: "Intercom Systems", uz: "Domofon tizimlari", ru: "Домофонные системы" },
        spend: { en: "1-2 days", uz: "1-2 kun", ru: "1-2 дня" },
        pricing_criterias: {
            en: [{ name: "Villa/Home", value: "1 panel + 1 screen", price: "$100" }, { name: "Building/Office", value: "Multi-user IP setup", price: "$350" }],
            uz: [{ name: "Hovli/Uy", value: "1 panel + 1 ekran", price: "$100" }, { name: "Bino/Ofis", value: "Ko‘p foydalanuvchili IP", price: "$350" }],
            ru: [{ name: "Дом/Вилла", value: "1 вызывная + 1 монитор", price: "$100" }, { name: "Здание/Офис", value: "Многоабонентский IP", price: "$350" }],
        },
        photo: "/__services/intercom.jpg",
    },
    {
        id: 6,
        slug: "wifi",
        keywords: ["wifi solutions", "wi-fi yechimlari", "wi-fi resheniya", "mesh wifi", "access point", "Ubiquiti", "MikroTik"],
        title: { en: "Wi-Fi Solutions", uz: "Wi-Fi yechimlari", ru: "Wi-Fi решения" },
        spend: { en: "1-2 days", uz: "1-2 kun", ru: "1-2 дня" },
        pricing_criterias: {
            en: [{ name: "Office Mesh", value: "Up to 3 APs", price: "$130" }, { name: "Enterprise", value: "High-density seamless", price: "$400" }],
            uz: [{ name: "Ofis Mesh", value: "3 tagacha nuqta", price: "$130" }, { name: "Korporativ", value: "Yuqori zichlikdagi qamrov", price: "$400" }],
            ru: [{ name: "Офисный Mesh", value: "До 3 точек", price: "$130" }, { name: "Корпоративный", value: "Бесшовный роуминг", price: "$400" }],
        },
        photo: "/__services/wifi.jpg",
    },
    {
        id: 7,
        slug: "smart-home",
        keywords: ["smart home", "aqlli uy", "umnyy dom", "IoT", "home automation", "smart lighting", "sensors"],
        title: { en: "Smart Home", uz: "Aqlli uy", ru: "Умный дом" },
        spend: { en: "3-7 days", uz: "3-7 kun", ru: "3-7 дней" },
        pricing_criterias: {
            en: [{ name: "Starter", value: "Lighting & Security", price: "$250" }, { name: "Complete", value: "Full house automation", price: "$850" }],
            uz: [{ name: "Boshlang‘ich", value: "Yoritish va xavfsizlik", price: "$250" }, { name: "To‘liq", value: "Butun uy avtomatizatsiyasi", price: "$850" }],
            ru: [{ name: "Базовый", value: "Освещение и безопасность", price: "$250" }, { name: "Полный", value: "Полная автоматизация", price: "$850" }],
        },
        photo: "/__services/smart-home.jpg",
    },
    {
        id: 8,
        slug: "it-infrastructure",
        keywords: ["IT infrastructure", "IT infratuzilma", "IT-infrastruktura", "enterprise", "datacenter", "virtualization"],
        title: { en: "IT Infrastructure", uz: "IT infratuzilma", ru: "IT-инфраструктура" },
        spend: { en: "3-10 days", uz: "3-10 kun", ru: "3-10 дней" },
        pricing_criterias: {
            en: [{ name: "Audit & Setup", value: "Core infrastructure", price: "$300" }, { name: "Turnkey", value: "End-to-end enterprise", price: "$1200" }],
            uz: [{ name: "Audit va Sozlash", value: "Asosiy infratuzilma", price: "$300" }, { name: "Kalit topshirish", value: "To‘liq korporativ tizim", price: "$1200" }],
            ru: [{ name: "Аудит и Настройка", value: "Базовая инфраструктура", price: "$300" }, { name: "Под ключ", value: "Комплексная инфраструктура", price: "$1200" }],
        },
        photo: "/__services/it-infrastructure.jpg",
    },
    {
        id: 9,
        slug: "cyber-security",
        keywords: ["cyber security", "kiberxavfsizlik", "kiberbezopasnost", "firewall", "antivirus", "data protection", "VPN"],
        title: { en: "Cyber Security", uz: "Kiberxavfsizlik", ru: "Кибербезопасность" },
        spend: { en: "2-7 days", uz: "2-7 kun", ru: "2-7 дней" },
        pricing_criterias: {
            en: [{ name: "Vulnerability Audit", value: "Security check & Report", price: "$200" }, { name: "Full Defense", value: "Firewall & Endpoint security", price: "$600" }],
            uz: [{ name: "Zaiflik Auditi", value: "Xavfsizlik tekshiruvi", price: "$200" }, { name: "To‘liq Himoya", value: "Firewall va Endpoint himoya", price: "$600" }],
            ru: [{ name: "Аудит уязвимостей", value: "Проверка и отчет", price: "$200" }, { name: "Комплексная защита", value: "Firewall и защита узлов", price: "$600" }],
        },
        photo: "/__services/cyber-security.jpg",
    },
    {
        id: 10,
        slug: "cloud-solutions",
        keywords: ["cloud solutions", "bulutli yechimlar", "oblachnye resheniya", "cloud backup", "VPS", "migration", "AWS"],
        title: { en: "Cloud Solutions", uz: "Bulutli yechimlar", ru: "Облачные решения" },
        spend: { en: "2-5 days", uz: "2-5 kun", ru: "2-5 дней" },
        pricing_criterias: {
            en: [{ name: "Cloud Migration", value: "Data & Service transfer", price: "$250" }, { name: "Hybrid Cloud", value: "Full cloud architecture", price: "$700" }],
            uz: [{ name: "Bulutga ko‘chirish", value: "Ma’lumot va xizmatlar", price: "$250" }, { name: "Gibrid Bulut", value: "To‘liq bulut arxitekturasi", price: "$700" }],
            ru: [{ name: "Миграция в облако", value: "Перенос сервисов и данных", price: "$250" }, { name: "Гибридное облако", value: "Комплексная архитектура", price: "$700" }],
        },
        photo: "/__services/cloud.jpg",
    },
    {
        id: 11,
        slug: "tech-support",
        keywords: ["technical support", "texnik yordam", "tehnicheskaya podderzhka", "helpdesk", "troubleshooting", "remote support"],
        title: { en: "Technical Support", uz: "Texnik yordam", ru: "Техническая поддержка" },
        spend: { en: "24/7 SLA", uz: "24/7 xizmat", ru: "24/7 поддержка" },
        pricing_criterias: {
            en: [{ name: "Monthly Standard", value: "Up to 15 workstations", price: "$120/mo" }, { name: "24/7 Enterprise", value: "Unlimited workstations", price: "$350/mo" }],
            uz: [{ name: "Oylik Standart", value: "15 tagacha kompyuter", price: "$120/oy" }, { name: "24/7 Korporativ", value: "Cheksiz qurilmalar", price: "$350/oy" }],
            ru: [{ name: "Ежемесячный Стандарт", value: "До 15 рабочих мест", price: "$120/мес" }, { name: "24/7 Корпоративный", value: "Безлимитная поддержка", price: "$350/мес" }],
        },
        photo: "/__services/tech-support.jpg",
    },
    {
        id: 12,
        slug: "maintenance",
        keywords: ["system maintenance", "tizimlarga xizmat korsatish", "obsluzhivanie sistem", "preventive IT", "hardware audit"],
        title: { en: "System Maintenance", uz: "Tizimlarga xizmat ko‘rsatish", ru: "Обслуживание систем" },
        spend: { en: "Regular / Monthly", uz: "Rejali / Oylik", ru: "Регулярно / Ежемесячно" },
        pricing_criterias: {
            en: [{ name: "Preventive", value: "Monthly diagnostics & tune-up", price: "$100/mo" }, { name: "Full Care", value: "Hardware & software SLA", price: "$300/mo" }],
            uz: [{ name: "Profilaktik", value: "Oylik diagnostika va tozalash", price: "$100/oy" }, { name: "To‘liq Qamrov", value: "Texnik va dasturiy SLA", price: "$300/oy" }],
            ru: [{ name: "Профилактика", value: "Ежемесячная диагностика", price: "$100/мес" }, { name: "Полный пакет", value: "Аппаратный и программный SLA", price: "$300/мес" }],
        },
        photo: "/__services/maintenance.jpg",
    },
];
