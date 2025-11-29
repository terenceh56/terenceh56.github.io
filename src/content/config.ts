import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional().nullable(),
    date: z.date(),
    tags: z.array(z.string()).or(z.string()).optional().nullable(),
    category: z.array(z.string()).or(z.string()).default('uncategorized').nullable(),
    sticky: z.number().default(0).nullable(),
    mathjax: z.boolean().default(false).nullable(),
    mermaid: z.boolean().default(false).nullable(),
    draft: z.boolean().default(false).nullable(),
    toc: z.boolean().default(true).nullable(),

    comment: z.boolean().default(true).nullable(),
    ogImage: z.string().optional()
  }),
});

const notes = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional().nullable(),
    date: z.date(),
    tags: z.array(z.string()).or(z.string()).optional().nullable(),
    mathjax: z.boolean().default(true).nullable(),
    mermaid: z.boolean().default(false).nullable(),
    draft: z.boolean().default(false).nullable(),
    toc: z.boolean().default(true).nullable(),
    pdf: z.string().optional().nullable(), // relative path to an uploaded PDF

    comment: z.boolean().default(true).nullable(),
    ogImage: z.string().optional(),
  }),
});

const reflections = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional().nullable(),
    date: z.date(),
    tags: z.array(z.string()).or(z.string()).optional().nullable(),
    draft: z.boolean().default(false).nullable(),
    toc: z.boolean().default(false).nullable(),

    comment: z.boolean().default(true).nullable(),
    ogImage: z.string().optional(),
  }),
});

const milestones = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional().nullable(),
    date: z.date(),
    tags: z.array(z.string()).or(z.string()).optional().nullable(),
    draft: z.boolean().default(false).nullable(),
    toc: z.boolean().default(false).nullable(),

    comment: z.boolean().default(true).nullable(),
    ogImage: z.string().optional(),
  }),
});

const papers = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional().nullable(),
    date: z.date(),
    authors: z.array(z.string()).optional().nullable(),
    venue: z.string().optional().nullable(),
    year: z.number().optional().nullable(),
    doi: z.string().optional().nullable(),
    tags: z.array(z.string()).or(z.string()).optional().nullable(),
    pdf: z.string().optional().nullable(),
    draft: z.boolean().default(false).nullable(),
    toc: z.boolean().default(true).nullable(),

    comment: z.boolean().default(true).nullable(),
    ogImage: z.string().optional(),
  }),
});

const feed = defineCollection({
  schema: z.object({
    date: z.date().or(z.string()).optional().nullable(),

    comment: z.boolean().default(true),
  })
})

export const collections = { blog, notes, reflections, milestones, papers, feed };
