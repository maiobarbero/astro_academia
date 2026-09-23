// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

import { template } from "./src/settings";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
    integrations: [react(), sitemap()],
    vite: {
        plugins: [tailwindcss()],
    },
    site: template.website_url,
    base: template.base,
});
