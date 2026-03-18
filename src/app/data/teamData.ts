type TeamMember = {
    id: number;
    name: {

        en: string;
        uz: string;
        ru: string;
    },
    position: {
        en: string;
        uz: string;
        ru: string;
    },
    media: {
        id: number;
        _icon?: 'Instagram' | 'MessageCircle';
        platform: 'Instagram' | 'Telegram';
        color: string;
        link: string;
    }[],
    avatar: string;
}

export const teamData: TeamMember[] = [
    {
        id: 1,
        name: {
            en: "Islombek O'razaliyev",
            uz: "Islom Urazaliyev",
            ru: "Ислам Уразалиев",
        },
        position: {
            en: "CEO, System Admin",
            uz: "Asoschi & Sistem admini",
            ru: "Основатель & Системный администратор",
        },
        media: [
            {
                id: 1,
                _icon: "Instagram",
                platform: "Instagram",
                color: "#fb31a7",
                link: "https://www.instagram.com/islom.0095",
            },
            {
                id: 2,
                _icon: "MessageCircle",
                platform: "Telegram",
                color: "#3388ff",
                link: "https://t.me/kvantsystem",
            },
        ],
        avatar: "/__team/Islom.png",
    },
    {
        id: 2,
        name: {
            en: "Ikrom Urazaliev",
            uz: "Ikrom Urazaliev",
            ru: "Икром Уразалиев",
        },
        position: {
            en: "-",
            uz: "-",
            ru: "разработчик",
        },
        media: [
            {
                id: 1,
                _icon: "MessageCircle",
                platform: "Telegram",
                color: "#3388ff",
                link: "https://t.me/im_ikrom",
            }
        ],
        avatar: "/__team/Ikrom.png",
    }
]
