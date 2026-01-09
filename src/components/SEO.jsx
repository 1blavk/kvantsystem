import { Helmet } from "react-helmet-async";
export default function SEO({
    title,
    description,
    keywords,
    url,
    image,
    lang = "en_US",
    type = "website",
    children,
}) {
    return (
        <Helmet>
            {/* Basic SEO */}
            <html lang={lang} />
            <title>{title}</title>
            <meta name="description" content={description} />
            {keywords && <meta name="keywords" content={keywords} />}

            {/* Canonical */}
            {url && <link rel="canonical" href={url} />}

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            {url && <meta property="og:url" content={url} />}
            {image && <meta property="og:image" content={image} />}
            <meta property="og:site_name" content="Kvant System" />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            {image && <meta name="twitter:image" content={image} />}

            {/* Extra children such as JSON-LD */}
            {children}
        </Helmet>
    );
}
