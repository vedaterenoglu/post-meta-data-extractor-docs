---
title: Nuxt
sidebar_position: 3
---

# Nuxt Integration

Call AI extraction from server routes/composables, not client-only code.

Reference server route example: [README API key section](https://github.com/vedaterenoglu/post-meta-extractor/blob/main/README.md#nuxt-server-route-example).

## Pattern

- `server/api/*.ts` receives markdown
- Build adapter using server runtime config
- Return `PostMetaAIResult`
