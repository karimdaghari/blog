import { readFile } from "node:fs/promises";
import type { ReactNode } from "react";
import $satori, { type SatoriOptions as Options } from "satori";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const dimensions = {
	width: 1200,
	height: 630,
} as const;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFont = async (name: string) => {
	const path = join(__dirname, "../assets/fonts", `${name}.ttf`);
	return await readFile(path);
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
