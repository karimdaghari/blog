import { getCollection } from "astro:content";
import { Resvg } from "@resvg/resvg-js";
import type { APIRoute } from "astro";
import type { ReactNode } from "react";
import { html } from "satori-html";
import { Config } from "~/consts";
import { satori } from "~/lib/satori";

type Props = Awaited<ReturnType<typeof getStaticPaths>>[number]["props"];

export const GET: APIRoute<Props> = async (context) => {
	const { title, pubDate, description } = context.props;
	const date = pubDate.toLocaleDateString("en-US", {
		dateStyle: "medium",
	});

	const htmlContent = html`
    <div tw='flex flex-col justify-between items-center h-full w-full bg-white py-4'>
			<p tw='font-medium'>${Config.me.fullName}</p>
			<div tw='flex flex-col justify-center items-center max-w-6xl mx-auto -mt-24'>
				<p>${date}</p>
      	<h1 tw='text-4xl -mb-2 -mt-0.5'>${title}</h1>
				<div tw='max-w-5xl mx-auto flex flex-col items-center justify-center'>
					<p>${description}</p>
				</div>
			</div>
			<p tw='font-semibold'>${Config.siteUrl}</p>
    </div>
  ` as ReactNode;

	const svg = await satori(htmlContent);

	const resvg = new Resvg(svg);
	const pngBuffer = resvg.render().asPng();

	return new Response(pngBuffer, {
		headers: {
			"Content-Type": "image/png",
		},
	});
};

export async function getStaticPaths() {
	const posts = await getCollection("blog");
	const paths = posts.map((post) => {
		return {
			params: {
				slug: post.slug,
			},
			props: {
				title: post.data.title,
				pubDate: post.data.updatedDate ?? post.data.pubDate,
				description: post.data.description,
			},
		};
	});
	return paths;
}
