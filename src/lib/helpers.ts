import { Config } from "~/consts";

export const getSocialLinks = () => {
	type Socials = keyof typeof Config.socials;

	return (Object.keys(Config.socials) as unknown as Socials[]).map(
		(network) => {
			const username = Config.socials[network];
			let url = "";
			switch (network) {
				case "x":
					url = `https://x.com/${username}`;
					break;
				case "github":
					url = `https://github.com/${username}`;
					break;
				case "linkedin":
					url = `https://linkedin.com/in/${username}`;
					break;
			}
			const icon = `simple-icons:${network}` as const;
			const ariaLabel = `${Config.me.name} on ${network}` as const;
			return {
				name: network,
				icon,
				url,
				ariaLabel,
			};
		},
	);
};
