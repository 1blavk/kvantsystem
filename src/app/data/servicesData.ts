export type PricingCriteria = {
    name: string; // e.g., "Basic", "Pro"
    value: string; // e.g., "1 server"
    price: string; // e.g., "$100"
};

export type LocalizedString = {
    en: string;
    uz: string;
    ru: string;
};

export type ServiceDataType = {
    id: number;
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
        title: { en: "Security Server Installation", uz: "Xavfsizlik Serverini O‘rnatish", ru: "Установка Серверов Безопасности" },
        spend: { en: "1-2 days", uz: "1-2 kun", ru: "1-2 дня" },
        pricing_criterias: {
            en: [{ name: "Basic", value: "1 server", price: "$100" }, { name: "Pro", value: "Up to 5 servers", price: "$400" }],
            uz: [{ name: "Asosiy", value: "1 server", price: "$100" }, { name: "Pro", value: "5 servergacha", price: "$400" }],
            ru: [{ name: "Базовый", value: "1 сервер", price: "$100" }, { name: "Про", value: "До 5 серверов", price: "$400" }],
        },
        photo: "/security-server.png",
    },
    {
        id: 2,
        title: { en: "Office CCTV Installation", uz: "Ofis Kamera O‘rnatish", ru: "Установка Офисных Камер" },
        spend: { en: "1 day", uz: "1 kun", ru: "1 день" },
        pricing_criterias: {
            en: [{ name: "Basic", value: "2 cameras", price: "$50" }, { name: "Pro", value: "4 cameras", price: "$90" }],
            uz: [{ name: "Asosiy", value: "2 kamera", price: "$50" }, { name: "Pro", value: "4 kamera", price: "$90" }],
            ru: [{ name: "Базовый", value: "2 камеры", price: "$50" }, { name: "Про", value: "4 камеры", price: "$90" }],
        },
        photo: "/cctv.png",
    },
    {
        id: 3,
        title: { en: "Cloud Backup Setup", uz: "Bulut Zaxira Sozlamasi", ru: "Настройка Облачного Резервного Копирования" },
        spend: { en: "2-3 days", uz: "2-3 kun", ru: "2-3 дня" },
        pricing_criterias: {
            en: [{ name: "Small Business", value: "Up to 5 TB", price: "$200" }, { name: "Enterprise", value: "Up to 50 TB", price: "$800" }],
            uz: [{ name: "Kichik Biznes", value: "5 TB gacha", price: "$200" }, { name: "Korporativ", value: "50 TB gacha", price: "$800" }],
            ru: [{ name: "Малый бизнес", value: "До 5 ТБ", price: "$200" }, { name: "Корпоратив", value: "До 50 ТБ", price: "$800" }],
        },
        photo: "/cloud-backup.png",
    },
    {
        id: 4,
        title: { en: "IT Support & Maintenance", uz: "IT Qo‘llab-quvvatlash va Texnik Xizmat", ru: "IT Поддержка и Обслуживание" },
        spend: { en: "Ongoing", uz: "Doimiy", ru: "Постоянно" },
        pricing_criterias: {
            en: [{ name: "Monthly", value: "Up to 5 devices", price: "$150" }, { name: "Enterprise", value: "Unlimited devices", price: "$500" }],
            uz: [{ name: "Oylik", value: "5 qurilmagacha", price: "$150" }, { name: "Korporativ", value: "Cheksiz qurilmalar", price: "$500" }],
            ru: [{ name: "Ежемесячно", value: "До 5 устройств", price: "$150" }, { name: "Корпоратив", value: "Неограниченно", price: "$500" }],
        },
        photo: "/it-support.png",
    },
    {
        id: 5,
        title: { en: "Network Infrastructure Setup", uz: "Tarmoq Infratuzilmasini Sozlash", ru: "Настройка Сетевой Инфраструктуры" },
        spend: { en: "3-5 days", uz: "3-5 kun", ru: "3-5 дней" },
        pricing_criterias: {
            en: [{ name: "Standard", value: "Small office", price: "$300" }, { name: "Enterprise", value: "Large office", price: "$800" }],
            uz: [{ name: "Standart", value: "Kichik ofis", price: "$300" }, { name: "Korporativ", value: "Katta ofis", price: "$800" }],
            ru: [{ name: "Стандарт", value: "Малый офис", price: "$300" }, { name: "Корпоратив", value: "Большой офис", price: "$800" }],
        },
        photo: "/network-setup.png",
    },
    {
        id: 6,
        title: { en: "Server Virtualization", uz: "Server Virtualizatsiyasi", ru: "Виртуализация Серверов" },
        spend: { en: "2-4 days", uz: "2-4 kun", ru: "2-4 дня" },
        pricing_criterias: {
            en: [{ name: "Basic", value: "1 server", price: "$250" }, { name: "Advanced", value: "Up to 10 servers", price: "$1000" }],
            uz: [{ name: "Asosiy", value: "1 server", price: "$250" }, { name: "Kengaytirilgan", value: "10 servergacha", price: "$1000" }],
            ru: [{ name: "Базовый", value: "1 сервер", price: "$250" }, { name: "Продвинутый", value: "До 10 серверов", price: "$1000" }],
        },
        photo: "/server-virtualization.png",
    },
    {
        id: 7,
        title: { en: "Office Computer Assembly", uz: "Ofis Kompyuteri Yig‘ish", ru: "Сборка Офисного Компьютера" },
        spend: { en: "1 day", uz: "1 kun", ru: "1 день" },
        pricing_criterias: {
            en: [{ name: "Basic", value: "Standard PC", price: "$400" }, { name: "High-End", value: "Power PC", price: "$800" }],
            uz: [{ name: "Asosiy", value: "Standart PC", price: "$400" }, { name: "Yuqori", value: "Kuchli PC", price: "$800" }],
            ru: [{ name: "Базовый", value: "Стандарт PC", price: "$400" }, { name: "Премиум", value: "Мощный PC", price: "$800" }],
        },
        photo: "/office-computer.png",
    },
    {
        id: 8,
        title: { en: "Smart Home Automation", uz: "Aqlli Uy Avtomatizatsiyasi", ru: "Автоматизация Умного Дома" },
        spend: { en: "2-3 days", uz: "2-3 kun", ru: "2-3 дня" },
        pricing_criterias: {
            en: [{ name: "Starter", value: "Basic setup", price: "$300" }, { name: "Pro", value: "Advanced setup", price: "$700" }],
            uz: [{ name: "Boshlang‘ich", value: "Asosiy sozlash", price: "$300" }, { name: "Pro", value: "Kengaytirilgan sozlash", price: "$700" }],
            ru: [{ name: "Старт", value: "Базовая настройка", price: "$300" }, { name: "Про", value: "Расширенная настройка", price: "$700" }],
        },
        photo: "/smart-home.png",
    },
    {
        id: 9,
        title: { en: "IT Outsourcing Services", uz: "IT Autsorsing Xizmatlari", ru: "IT Аутсорсинг Услуги" },
        spend: { en: "Ongoing", uz: "Doimiy", ru: "Постоянно" },
        pricing_criterias: {
            en: [{ name: "Small Business", value: "Up to 5 employees", price: "$500" }, { name: "Enterprise", value: "Unlimited employees", price: "$1500" }],
            uz: [{ name: "Kichik Biznes", value: "5 xodimgacha", price: "$500" }, { name: "Korporativ", value: "Cheksiz xodimlar", price: "$1500" }],
            ru: [{ name: "Малый бизнес", value: "До 5 сотрудников", price: "$500" }, { name: "Корпоратив", value: "Неограниченно сотрудников", price: "$1500" }],
        },
        photo: "/it-outsourcing.png",
    },
    {
        id: 10,
        title: { en: "Business Digital Transformation", uz: "Biznesni Raqamlashtirish", ru: "Цифровая Трансформация Бизнеса" },
        spend: { en: "Varies", uz: "O‘zgaruvchan", ru: "Разное" },
        pricing_criterias: {
            en: [{ name: "Basic", value: "Process review", price: "$1000" }, { name: "Full", value: "Complete digital transformation", price: "$5000" }],
            uz: [{ name: "Asosiy", value: "Jarayonlarni tahlil qilish", price: "$1000" }, { name: "To‘liq", value: "To‘liq raqamlashtirish", price: "$5000" }],
            ru: [{ name: "Базовый", value: "Анализ процессов", price: "$1000" }, { name: "Полный", value: "Полная цифровая трансформация", price: "$5000" }],
        },
        photo: "/digital-transformation.png",
    },
];
