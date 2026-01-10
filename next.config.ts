import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
    trailingSlash: true,
    devIndicators: false,
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);