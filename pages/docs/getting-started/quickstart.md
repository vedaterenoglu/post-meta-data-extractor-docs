---
title: Quickstart
sidebar_position: 2
---

# Quickstart

For the canonical package quickstart and API summary, use [README](https://github.com/vedaterenoglu/post-meta-extractor/blob/main/README.md#core-sync-api).

## Install

```bash
npm install post-meta-extractor
```

## Sync Extraction

```ts
import { extractPostMeta } from "post-meta-extractor";

const meta = extractPostMeta({
  markdown: "# Hello World",
});
```

## Async AI Extraction

```ts
import { extractPostMetaWithAI } from "post-meta-extractor";

const result = await extractPostMetaWithAI(
  { markdown: "# AI Post" },
  {
    ai: {
      adapter: {
        generate: async () => ({
          description: "AI summary",
          tags: ["ai"],
        }),
      },
    },
  },
);
```

## Security Reminder

Keep provider keys in server-side environment variables. See [API Keys and Security](../guides/api-keys-and-security.md).
