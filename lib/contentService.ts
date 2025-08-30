import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

// Define the posts directory
const postsDirectory = path.join(process.cwd(), '_posts');

// TypeScript interfaces
export interface ContentSummary {
  id: string;
  title: string;
  date: string;
  description?: string;
  thumbnail?: string;
  author?: string;
}

export interface ContentData extends ContentSummary {
  contentHtml: string;
}

/**
 * Get all content summaries sorted by date (newest first)
 */
export function getSortedContentSummaries(): ContentSummary[] {
  // Get file names under /_posts
  const fileNames = fs.readdirSync(postsDirectory);
  
  const allPostsData = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map((fileName) => {
      // Remove ".md" from file name to get id
      const id = fileName.replace(/\.md$/, '');

      // Read markdown file as string
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents);

      // Combine the data with the id
      return {
        id,
        title: matterResult.data.title || '',
        date: matterResult.data.date || '',
        description: matterResult.data.description,
        thumbnail: matterResult.data.thumbnail,
        author: matterResult.data.author,
      } as ContentSummary;
    });

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

/**
 * Get all post ids for getStaticPaths
 */
export function getAllContentIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  
  return fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map((fileName) => {
      return {
        params: {
          id: fileName.replace(/\.md$/, ''),
        },
      };
    });
}

/**
 * Get complete content data for a specific post
 */
export async function getContentData(id: string): Promise<ContentData> {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    title: matterResult.data.title || '',
    date: matterResult.data.date || '',
    description: matterResult.data.description,
    thumbnail: matterResult.data.thumbnail,
    author: matterResult.data.author,
  } as ContentData;
}