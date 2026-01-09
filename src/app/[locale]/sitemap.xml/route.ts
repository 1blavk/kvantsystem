import { NextResponse } from "next/server";

// Example: dynamic URLs (replace with your DB or API fetch)
const dynamicPages = [
    "/",
    "/about",
    "/services"
];

export async function GET() {
    const baseUrl = "https://kvantsystem.uz";

    const urls = dynamicPages
        .map(
            (url) => `
    <url>
      <loc>${baseUrl}${url}</loc>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>
  `
        )
        .join("");

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls}
  </urlset>`;

    return new NextResponse(sitemap, {
        headers: {
            "Content-Type": "application/xml",
        },
    });
}
