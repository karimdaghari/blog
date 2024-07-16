export const Config = {
	siteUrl: "https://karimdaghari.com",
	/**
	 * Site title
	 */
	title: "Karim Daghari",
	/**
	 * Site description
	 */
	description:
		"Welcome to my little corner of the internet. I'm a software developer and I love to write about code, entrepreneurship, and life.",
	me: {
		name: "Karim",
		fullName: "Karim Daghari",
		intro_long:
			"I'm a full-stack developer with an entrepreneurial spirit (and experience). I love building things that solve problems.",
		intro_short: "Full-stack developer, entrepreneur, and writer.",
		picture: "/me.jpeg",
		phoneNumber: "(+216) 96 994 074",
		email: "hello@karimdaghari.com",
	},
	sections: {
		blog: {
			title: "Blog",
			intro: "Check out my latest posts",
			description: "Thoughts on code, entrepreneurship, and life.",
		},
		books: {
			title: "Books",
			intro: "What I've been reading",
			description: "A collection of books I've read and my notes on them.",
		},
		contact: {
			title: "Contact",
			intro: "Get in Touch",
			description:
				"Whether you have a question, just want to say hi, or have a project in mind, I'd love to hear from you.",
		},
	},
	socials: {
		github: "karimdaghari",
		linkedin: "karimdaghari",
		x: "@karimdaghari_",
	},
} as const;
