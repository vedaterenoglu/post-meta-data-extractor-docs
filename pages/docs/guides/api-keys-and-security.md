---
title: API Keys and Security
sidebar_position: 7
---

# API Keys and Security

`post-meta-extractor` does not store or fetch API keys.

Use server-side key management in your host app.

Canonical guidance lives in [README API Key Handling](https://github.com/vedaterenoglu/post-meta-extractor/blob/main/README.md#api-key-handling).

## Rules

- Keep keys in server environment variables
- Never ship provider keys to browser bundles
- Keep AI adapter calls in server/SSR code paths
