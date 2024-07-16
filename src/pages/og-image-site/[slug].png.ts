import { Resvg } from "@resvg/resvg-js";
import type { APIRoute } from "astro";
import type { ReactNode } from "react";
import { html } from "satori-html";
import { Config } from "~/consts";
import { satori } from "~/lib/satori";

type Params = Awaited<ReturnType<typeof getStaticPaths>>[number]["params"];

export const GET: APIRoute<never, Params> = async (context) => {
	const { slug } = context.params;

	let title = "";
	let description = "";

	if (slug === "index") {
		title = `Hi, I'm ${Config.me.name}!`;
		description = Config.description;
	} else if (slug === "blog") {
		title = Config.sections.blog.title;
		description = Config.sections.blog.description;
	} else if (slug === "resume") {
		title = "Resume";
		description = "View my resume!";
	}

	const htmlContent = html`
    <div tw='flex flex-col justify-between items-center h-full w-full bg-white p-4'>
			<p tw='font-medium tracking-widest'>${Config.me.fullName}</p>
			<div tw='flex items-center'>
				<div tw='flex flex-col justify-center items-center w-1/2'>
					<div tw='flex flex-col max-w-96 mx-auto'>
						<h1 tw='-mb-4'>${title}</h1>
						<p>${description}</p>
					</div>
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
	return [
		{ params: { slug: "index" as const } },
		{ params: { slug: "blog" as const } },
		{ params: { slug: "resume" as const } },
	];
}
