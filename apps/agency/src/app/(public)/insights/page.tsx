import { InsightsHubHero, FeaturedInsight, CategoryFilters, InsightsGrid, NewsletterCapture } from '@/features/insights';



export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center w-full">
      <InsightsHubHero />
      <FeaturedInsight />
      <CategoryFilters />
      <InsightsGrid />
      <NewsletterCapture />
    </main>
  );
}
