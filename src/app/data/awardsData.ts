import { LocalizedString } from "./types"

export type AwardsDataType = {
    id: number;
    alt: LocalizedString;
    link: string;
    photo: string;
};

export const awardsData: AwardsDataType[] = [
    {
        id: 1,
        alt: {
            uz: "tet",
            ru: "tesstru",
            en: "testEn"
        },
        link: "tesr",
        photo: "/__awards/award1.png"
    }
]