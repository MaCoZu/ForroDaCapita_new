import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const news = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/news', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		thumbnail: z.string().optional(),
		// description: z.string(),
		// Transform string to Date object
	}),
});

export const collections = { news };
