import { defineMiddleware } from "astro:middleware";
import { getSocialLinks } from "./lib/helpers";

export const onRequest = defineMiddleware(({ redirect, url }, next) => {
	const pathname = url.pathname.slice(1);

	const socials = getSocialLinks();
	if (socials.some((social) => social.name === pathname.toLowerCase())) {
		const social = socials.find((social) => social.name === pathname);
		if (social) return redirect(social.url, 308);
	}

	return next();
});
