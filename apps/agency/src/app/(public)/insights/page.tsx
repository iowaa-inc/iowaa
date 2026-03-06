import { CategoryFilters } from "./_components/category-filters";
import { FeaturedInsight } from "./_components/featured-insight";
import { InsightsGrid } from "./_components/insights-grid";
import { InsightsHubHero } from "./_components/insights-hub-hero";
import { NewsletterCapture } from "./_components/newsletter-capture";

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
