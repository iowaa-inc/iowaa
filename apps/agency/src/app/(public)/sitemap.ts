import type { MetadataRoute } from "next";

const STRAPI_URL = process.env.STRAPI_URL;
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

async function getStrapiData(endpoint: string) {
  const response = await fetch(`${STRAPI_URL}/api/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${STRAPI_API_TOKEN}`,
    },
    next: { revalidate: 3600 }, // Cache for 1 hour
  });

  if (!response.ok) return [];
  const { data } = await response.json();
  return data || [];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://agency.iowaa.com";
  const currentDate = new Date();

  const [regions, solutions] = await Promise.all([
    getStrapiData(
      "regions?fields[0]=slug&fields[1]=updatedAt&pagination[pageSize]=100"
    ),
    getStrapiData(
      "solutions?populate[region][fields][0]=slug&fields[0]=slug&fields[1]=updatedAt&pagination[pageSize]=100"
    ),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/methodology`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/regions`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/the-firm`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/strategy-session`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/resources/insights`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/resources/brand-assets`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.6,
    },
  ];

  const dynamicRegionRoutes = regions.map((region: any) => ({
    url: `${baseUrl}/regions/${region.attributes.slug}`,
    lastModified: new Date(region.attributes.updatedAt),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const dynamicSolutionRoutes = solutions
    .filter((s: any) => s.attributes.region?.data?.attributes?.slug)
    .map((solution: any) => ({
      url: `${baseUrl}/regions/${solution.attributes.region.data.attributes.slug}/${solution.attributes.slug}`,
      lastModified: new Date(solution.attributes.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));

  return [...staticRoutes, ...dynamicRegionRoutes, ...dynamicSolutionRoutes];
}
