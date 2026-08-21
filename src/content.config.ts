import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const writing = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/writing" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedAt: z.coerce.date(),
    label: z.string(),
    tags: z.array(z.string()).default([]),
    archived: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

export const collections = { writing };
