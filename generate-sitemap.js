import { SitemapStream, streamToPromise } from "sitemap";
import { createWriteStream } from "fs";
import { resolve } from "path";


async function generateSitemap() {
    const sitemap = new SitemapStream({
        hostname: "http://kvantsystem.uz",
    });

    const links = [
        { url: "/", changefreq: "weekly", priority: 1.0 },
        { url: "/about", changefreq: "monthly", priority: 0.8 },
        { url: "/services", changefreq: "weekly", priority: 0.9 },
        { url: "/services/store", changefreq: "weekly", priority: 0.7 },
        { url: "/services/calculate", changefreq: "weekly", priority: 0.7 },
    ];

    const writeStream = createWriteStream(resolve("./public/sitemap.xml"));
    sitemap.pipe(writeStream);

    links.forEach(link => sitemap.write(link));
    sitemap.end();

    await streamToPromise(sitemap);

    console.log("✅ sitemap.xml created successfully!");
}

generateSitemap();
