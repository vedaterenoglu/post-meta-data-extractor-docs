---
title: AI Adapters
sidebar_position: 1
---

# AI Adapters

This package is provider-agnostic. You inject your own adapter via `options.ai.adapter`.

Canonical API signatures are documented in [README](https://github.com/vedaterenoglu/post-meta-extractor/blob/main/README.md#core-async-ai-api).

## Adapter Contract

```ts
type PostMetaAIAdapter = {
  name?: string;
  generate: (input: {
    system: string;
    user: string;
    schema: {
      type: "object";
      properties: {
        description: { type: ["string", "null"] };
        tags: { type: "array"; items: { type: "string" } };
      };
      required: ["description", "tags"];
      additionalProperties: false;
    };
  }) => Promise<{ description: string | null; tags: string[] }>;
};
```

## Behavior Notes

- AI retries default to 3
- Invalid responses are retried
- After retries fail: `description = null`, `tags = []`
- Diagnostics are always returned in `result.ai`

## Related

- [TanStack Start Guide](./tanstack-start.md)
- [Nuxt Guide](./nuxt.md)
- [API Keys and Security](./api-keys-and-security.md)
