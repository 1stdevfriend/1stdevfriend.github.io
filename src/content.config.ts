import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    logo: z.string().optional(),
    org: z.string(),
    category: z.string(),
    tags: z.array(z.string()).default([]),
    complexity: z.string().default('Unknown'),
    repos: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    order: z.number(),
    liveUrl: z.string().optional(),
  }),
});

export const collections = { projects };
