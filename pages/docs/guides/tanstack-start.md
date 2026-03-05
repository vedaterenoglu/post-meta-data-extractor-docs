---
title: TanStack Start
sidebar_position: 2
---

# TanStack Start Integration

Use the optional helper export for TanStack-style adapter wiring:

```ts
import { createTanStackStartAIAdapter } from "post-meta-extractor/tanstack-start-ai";
```

Then pass the adapter to `extractPostMetaWithAI`.

See the canonical helper snippet in [README](https://github.com/vedaterenoglu/post-meta-extractor/blob/main/README.md#tanstack-start-ai-helper).

## Checklist

- Keep AI calls in server actions/loaders
- Read keys from server env only
- Return structured `{ description, tags }`
