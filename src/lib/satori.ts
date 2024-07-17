import { readFile } from "node:fs/promises";
import type { ReactNode } from "react";
import $satori, { type SatoriOptions as Options } from "satori";
import { join } from "node:path";

const dimensions = {
	width: 1200,
	height: 630,
} as const;

const getFont = async (name: string) => {
	const pathname = join(
		process.cwd(),
		import.meta.env.PROD ? "dist" : "public",
		`fonts/${name}.ttf`,
	);
	console.log({
		cwd: process.cwd(),
		pathname,
	});
	return await readFile(pathname);
};

const fonts = {
	regular: await getFont("Inter-Regular"),
	bold: await getFont("Inter-Bold"),
	medium: await getFont("Inter-Medium"),
	semiBold: await getFont("Inter-SemiBold"),
};

export const satori = async (content: ReactNode, options?: Options) =>
	$satori(content, {
		height: dimensions.height,
		width: dimensions.width,
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
		...options,
	});
