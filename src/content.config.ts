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

const work = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/work" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      year: z.number().int(),
      venue: z.string(),
      kind: z.enum(["Publication", "Project"]).default("Publication"),
      authors: z.string(),
      description: z.string(),
      tags: z.array(z.string()).default([]),
      links: z.array(
        z.object({
          label: z.enum([
            "Paper",
            "Code",
            "Related code",
            "Dataset",
            "Project",
            "Demo",
          ]),
          href: z.url(),
        }),
      ),
      featuredOrder: z.number().int().positive().optional(),
      hero: z
        .object({
          src: image(),
          alt: z.string(),
          caption: z.string().optional(),
        })
        .optional(),
      draft: z.boolean().default(false),
    }),
});

export const collections = { writing, work };
