// Server Component for Blogs page
import { BlogsClient } from './blogs-client';

export default function BlogsPage() {
  return <BlogsClient />;
}

// SEO metadata for Blogs page
export const metadata = {
  title: 'Blogs - Etheca',
  description: 'Selected writings and insights from the Etheca team',
};
