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
        platform: string;
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
                platform: "Instagram",
                color: "#C16D3C",
                link: "https://t.me/example",
            },
            {
                id: 2,
                platform: "Telegram",
                color: "#527BB3",
                link: "https://t.me/KVANTSYSTEM",
            },
        ],
        avatar: "/__team/IslomUrazaliev.png",
    }
]
