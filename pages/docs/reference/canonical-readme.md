# post-meta-extractor

Framework-agnostic post metadata extractor with optional React, Solid, and Vue wrappers.

## What This Package Does

- Extracts metadata from markdown content
- Works in Node, browser, and SSR contexts
- Provides deterministic extraction and optional AI-first extraction
- Provides optional React/Solid/Vue wrapper APIs

## What This Package Does Not Do

- No built-in UI components
- No database or storage integration
- No markdown-to-HTML rendering pipeline

## Install

```bash
npm install post-meta-extractor
```

## Test and Coverage

```bash
npm test
npm run test:coverage
```

Coverage reports are written to `./coverage` (HTML report: `./coverage/index.html`).

## Deep Docs

README is the canonical quickstart and top-level API summary. For deeper guides, use:

- [Docs Site](https://vedaterenoglu.github.io/post-meta-data-extractor-docs/)
- [Docs Repository](https://github.com/vedaterenoglu/post-meta-data-extractor-docs)
- [Docs Overview](https://vedaterenoglu.github.io/post-meta-data-extractor-docs/docs/getting-started/overview)
- [AI Adapters Guide](https://vedaterenoglu.github.io/post-meta-data-extractor-docs/docs/guides/ai-adapters)
- [TanStack Start Guide](https://vedaterenoglu.github.io/post-meta-data-extractor-docs/docs/guides/tanstack-start)
- [Nuxt Guide](https://vedaterenoglu.github.io/post-meta-data-extractor-docs/docs/guides/nuxt)
- [Core API Reference](https://vedaterenoglu.github.io/post-meta-data-extractor-docs/docs/reference/core-api)

## Core Sync API

```ts
import { extractPostMeta } from "post-meta-extractor";

const meta = extractPostMeta({
  markdown: `---
title: My Post
aliases: [old-my-post]
tags: [TanStack, Solid]
---
# My Post

First paragraph`,
  sourceSlug: "2026-03-05-my-post",
});
```

### Sync Output

```ts
type PostMeta = {
  title: string | null;
  description: string | null;
  date: string | null;
  dateValue: number;
  slug: string;
  aliases: string[];
  thumbnailUrl: string | null;
  tags: string[];
  published: boolean | null;
};
```

## Core Async AI API

```ts
import { extractPostMetaWithAI } from "post-meta-extractor";

const result = await extractPostMetaWithAI(
  { markdown: "# AI Post" },
  {
    ai: {
      adapter: {
        name: "my-provider",
        generate: async ({ system, user, schema }) => {
          // call your provider here
          return {
            description: "AI summary",
            tags: ["ai", "metadata"],
          };
        },
      },
      maxRetries: 3,
    },
  },
);
```

### AI Output Additions

```ts
type PostMetaAIResult = PostMeta & {
  ai: {
    status: "success" | "failed";
    attempts: number;
    warnings: string[];
    provider?: string;
  };
};
```

Notes:

- AI API uses AI for `description` and `tags`.
- AI retries default to `3`.
- After retries fail, `description` is `null` and `tags` is `[]`.
- AI diagnostics are always included in `result.ai`.
- Deterministic fields (`title`, `slug`, `aliases`, `thumbnailUrl`, date fields) always come from parser logic.

## TanStack Start AI Helper

```ts
import { createTanStackStartAIAdapter } from "post-meta-extractor/tanstack-start-ai";

const adapter = createTanStackStartAIAdapter(async (payload) => {
  // call TanStack Start AI
  return { description: "summary", tags: ["tanstack"] };
});
```

## API Key Handling

This package does not read or store API keys.
You must handle provider keys in your host app and inject an adapter.

Rules:

- Keep keys in server-side environment variables.
- Do not expose provider keys to browser/client bundles.
- Build adapter calls in server/SSR code paths.

### TanStack Start (server-side example)

```ts
import { extractPostMetaWithAI } from "post-meta-extractor";

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) throw new Error("Missing OPENAI_API_KEY");

const result = await extractPostMetaWithAI(
  { markdown },
  {
    ai: {
      adapter: {
        name: "openai",
        generate: async ({ system, user, schema }) => {
          // call provider SDK with apiKey in server code
          return { description: "summary", tags: ["tanstack"] };
        },
      },
    },
  },
);
```

### Nuxt (server route example)

```ts
// server/api/extract-meta.post.ts
import { extractPostMetaWithAI } from "post-meta-extractor";

export default defineEventHandler(async (event) => {
  const body = await readBody<{ markdown: string }>(event);
  const config = useRuntimeConfig(event);
  const apiKey = config.openaiApiKey; // server runtime config

  const result = await extractPostMetaWithAI(
    { markdown: body.markdown },
    {
      ai: {
        adapter: {
          name: "openai",
          generate: async ({ system, user, schema }) => {
            // call provider SDK with apiKey in server route only
            return { description: "summary", tags: ["nuxt"] };
          },
        },
      },
    },
  );

  return result;
});
```

## React Wrapper

```tsx
import { usePostMeta, usePostMetaWithAI } from "post-meta-extractor/react";

const syncMeta = usePostMeta({ markdown });
const aiMeta = usePostMetaWithAI({ markdown }, { ai: { adapter } });
```

`usePostMetaWithAI` returns:

- `data: PostMetaAIResult | null`
- `isLoading: boolean`
- `error: Error | null`
- `refresh: () => Promise<void>`

## Solid Wrapper

```tsx
import { createPostMeta, createPostMetaWithAI } from "post-meta-extractor/solid";

const syncMeta = createPostMeta(() => ({ markdown: props.markdown }));
const aiMeta = createPostMetaWithAI(() => ({ markdown: props.markdown }), { ai: { adapter } });
```

`createPostMetaWithAI` returns:

- `data: Accessor<PostMetaAIResult | null>`
- `loading: Accessor<boolean>`
- `error: Accessor<Error | null>`
- `refetch: () => Promise<PostMetaAIResult | null>`

## Vue/Nuxt Wrapper

```ts
import { ref } from "vue";
import { usePostMeta, usePostMetaWithAI } from "post-meta-extractor/vue";

const input = ref({ markdown: "# Hello" });
const syncMeta = usePostMeta(input);
const aiMeta = usePostMetaWithAI(input, { ai: { adapter } });
```

`usePostMetaWithAI` returns:

- `data: Ref<PostMetaAIResult | null>`
- `isLoading: Ref<boolean>`
- `error: Ref<Error | null>`
- `refresh: () => Promise<void>`

## Extraction Rules

- Frontmatter keys supported: `title`, `date`, `description`, `thumbnailUrl`, `aliases`, `tags`, `published`
- Title priority: frontmatter title -> first markdown heading -> `fallbackTitle` -> `null`
- Date priority: frontmatter date -> slug prefix `YYYY-MM-DD-*` -> `null`
- Slug priority: normalized `sourceSlug` -> normalized title -> `"untitled"`
- Aliases source: frontmatter `aliases`, normalized and deduplicated
- Thumbnail priority: frontmatter `thumbnailUrl` -> first markdown image -> `null`
- Sync `description` fallback: first meaningful content line, truncated by `maxDescriptionLength` (default `180`)
- Sync `tags` are normalized to lowercase, trimmed, and deduplicated
- Parser is lenient and does not throw for malformed content
- AI path validates adapter output shape and retries on invalid/failed responses
