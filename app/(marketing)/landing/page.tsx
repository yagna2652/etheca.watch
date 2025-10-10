// Server Component - runs on server first, then sends HTML to browser (faster loading)
import { LandingPageClient } from './landing-client';

export default function LandingPage() {
  return <LandingPageClient />;
}

// SEO metadata - helps Google understand this page
export const metadata = {
  title: 'Etheca - Building a Better Way to Work',
  description: 'With Etheca, we\'re building a better way to work',
};
