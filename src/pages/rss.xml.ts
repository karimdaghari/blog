import { getCollection } from "astro:content";
import rss from "@astrojs/rss";
import type { APIRoute } from "astro";
import { Config } from "~/consts";

export const GET: APIRoute = async ({ site }) => {
	if (!site) throw new Error("No site URL set in Astro config");
	const posts = await getCollection("blog");
	return rss({
		title: Config.title,
		description: Config.description,
		site,
		items: posts.map((post) => ({
			...post.data,
			link: `/blog/${post.slug}/`,
		})),
	});
};
