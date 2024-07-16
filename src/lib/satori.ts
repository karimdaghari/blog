import type { ReactNode } from "react";
import $satori, { type SatoriOptions as Options } from "satori";
import { readFile } from "node:fs/promises";

const dimensions = {
	width: 1200,
	height: 630,
} as const;

const fonts = {
	regular: await readFile("src/assets/fonts/Inter-Regular.ttf"),
	bold: await readFile("src/assets/fonts/Inter-Bold.ttf"),
	medium: await readFile("src/assets/fonts/Inter-Medium.ttf"),
	semiBold: await readFile("src/assets/fonts/Inter-SemiBold.ttf"),
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
