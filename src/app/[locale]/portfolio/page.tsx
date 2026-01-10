import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: 'en' | 'uz' | 'ru' }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'META_DATA' });

    return {
        title: "Portfolio",
        description: "Portfolio",
        keywords: "Portfolio",
    };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: 'en' | 'uz' | 'ru' }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'PortfolioPage' });


    return (
        <>
            <div className="pt-16">
                Portfolio
            </div>
        </>
    );
}