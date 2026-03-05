# Contributing

## Docs Ownership

- Update upstream package README for canonical quickstart and API framing.
- Update this repo for deep guides, workflows, troubleshooting, and extended references.
- Avoid duplicating long canonical sections from upstream README.

## Canonical Sync

- Workflow `.github/workflows/sync-readme.yml` syncs upstream README snapshot through PRs.
- Do not hand-edit `pages/docs/reference/canonical-readme.md` unless sync tooling is being fixed.

## Required Checks

Run before merging:

```bash
npm run typecheck
npm run build
npm run check:readme-drift
npm run check:links
```
