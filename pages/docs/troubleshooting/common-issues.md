---
title: Common Issues
sidebar_position: 1
---

# Common Issues

## AI Returns Empty Tags/Description

- Check adapter output matches schema
- Review `result.ai.warnings`
- Verify provider call succeeds with server credentials

## Docs Drift Between README and /docs

Run:

```bash
npm run check:docs-drift
```

## Docusaurus Build Fails

Run:

```bash
npm run docs:build
```

Then inspect broken link errors and fix docs cross-links.
