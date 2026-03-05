# post-meta-data-extractor-docs

Documentation site for [`post-meta-extractor`](https://github.com/vedaterenoglu/post-meta-extractor).

## Governance

- Canonical source for quickstart and top-level API framing: upstream package `README.md`.
- This repo extends with task-oriented guides, troubleshooting, and deep references.
- Canonical README snapshot is stored at `pages/docs/reference/canonical-readme.md` and synced via workflow PRs.

## Development

```bash
npm install
npm run dev
```

## Quality Checks

```bash
npm run typecheck
npm run build
npm run check:readme-drift
npm run check:links
```

## Deployment

GitHub Pages deployment is automated from `main` via `.github/workflows/deploy-docs.yml`.
