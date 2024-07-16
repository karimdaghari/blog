import satori from "satori";
import { html } from "satori-html";
import { Resvg } from "@resvg/resvg-js";
import type { APIRoute } from "astro";
import type { ReactNode } from "react";
import { readFile } from "node:fs/promises";
import { Config } from "~/consts";

const dimensions = {
	width: 1200,
	height: 630,
} as const;

type Params = Awaited<ReturnType<typeof getStaticPaths>>[number]["params"];

export const GET: APIRoute<never, Params> = async (context) => {
	const { slug } = context.params;

	const avatar =
		process.env.NODE_ENV === "production"
			? (`${Config.siteUrl}${Config.me.picture}` as const)
			: (`http://localhost:4321${Config.me.picture}` as const);

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
			<div tw='flex items-center space-x-4'>
				<div tw='flex flex-col justify-center items-center w-1/2'>
					<div tw='flex flex-col max-w-96 mx-auto'>
						<h1 tw='-mb-4'>${title}</h1>
						<p>${description}</p>
					</div>
				</div>
				<div tw='w-1/2 flex items-center justify-center'>
						<img tw='w-32 h-32 rounded-full' src='${avatar}' alt='avatar' />
				</div>
			</div>
			<p tw='font-semibold tracking-widest'>${Config.siteUrl}</p>
    </div>
  ` as ReactNode;

	const fonts = {
		regular: await readFile("src/assets/fonts/Inter-Regular.ttf"),
		bold: await readFile("src/assets/fonts/Inter-Bold.ttf"),
		medium: await readFile("src/assets/fonts/Inter-Medium.ttf"),
		semiBold: await readFile("src/assets/fonts/Inter-SemiBold.ttf"),
	};

	const svg = await satori(htmlContent, {
		width: dimensions.width,
		height: dimensions.height,
		fonts: [
			{
				name: "Inter",
				data: fonts.regular,
				weight: 400,
				style: "normal",
			},
			{
				name: "Inter",
				data: fonts.medium,
				weight: 500,
				style: "normal",
			},
			{
				name: "Inter",
				data: fonts.semiBold,
				weight: 600,
				style: "normal",
			},
			{
				name: "Inter",
				data: fonts.bold,
				weight: 700,
				style: "normal",
			},
		],
	});

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
