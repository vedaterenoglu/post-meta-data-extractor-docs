---
title: Core API
sidebar_position: 1
---

# Core API

Reference quickstart source of truth: [README Core Sync API](https://github.com/vedaterenoglu/post-meta-extractor/blob/main/README.md#core-sync-api) and [README Core Async AI API](https://github.com/vedaterenoglu/post-meta-extractor/blob/main/README.md#core-async-ai-api).

## Exports

- `extractPostMeta(input, options?)`
- `extractPostMetaWithAI(input, options)`

## Deterministic Output

- `title`, `slug`, `aliases`, `thumbnailUrl`, date fields are parser-driven

## AI Output

- `description`, `tags` are AI-driven in async API path
- `ai.status`, `ai.attempts`, `ai.warnings`, `ai.provider`
