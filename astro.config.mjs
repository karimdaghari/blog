import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import react from "@astrojs/react";

import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
	site: "https://karimdaghari.com",
	integrations: [
		mdx(),
		sitemap(),
		tailwind({
			applyBaseStyles: false,
		}),
		icon(),
		react(),
	],
	output: "server",
	adapter: netlify(),
});
