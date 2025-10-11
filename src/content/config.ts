import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    image: z.string().optional(),
    authors: z.array(z.string()).default(['Team']),
    published: z.boolean().default(true),
  }),
});

export const collections = { blog };
