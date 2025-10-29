import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			url: "https://www.Primus IDP.com/",
			lastModified: new Date(),
			changeFrequency: "yearly",
			priority: 1,
		},
		{
			url: "https://www.Primus IDP.com/contact",
			lastModified: new Date(),
			changeFrequency: "yearly",
			priority: 1,
		},
		{
			url: "https://www.Primus IDP.com/pricing",
			lastModified: new Date(),
			changeFrequency: "yearly",
			priority: 0.9,
		},
		{
			url: "https://www.Primus IDP.com/privacy",
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.9,
		},
		{
			url: "https://www.Primus IDP.com/terms",
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.9,
		},
		{
			url: "https://www.Primus IDP.com/docs",
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.9,
		},
		{
			url: "https://www.Primus IDP.com/docs/installation",
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.9,
		},
		{
			url: "https://www.Primus IDP.com/docs/docker-installation",
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.9,
		},
		{
			url: "https://www.Primus IDP.com/docs/manual-installation",
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.9,
		},
	];
}


