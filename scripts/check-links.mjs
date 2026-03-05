import { existsSync, readFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { execSync } from 'node:child_process'

const root = process.cwd()
const filesRaw = execSync('find pages -type f \\( -name "*.md" -o -name "*.mdx" -o -name "*.tsx" \\) ; echo README.md', { encoding: 'utf8' })
const files = filesRaw
  .split('\n')
  .map((s) => s.trim())
  .filter(Boolean)

const linkRe = /\[[^\]]+\]\(([^)]+)\)/g
let hasError = false

for (const rel of files) {
  if (rel === 'pages/docs/reference/canonical-readme.md') continue
  const full = resolve(root, rel)
  if (!existsSync(full)) continue
  const text = readFileSync(full, 'utf8')

  for (const match of text.matchAll(linkRe)) {
    const rawHref = match[1].trim()
    if (!rawHref || rawHref.startsWith('http://') || rawHref.startsWith('https://') || rawHref.startsWith('mailto:') || rawHref.startsWith('#')) {
      continue
    }

    const href = rawHref.split('#')[0]
    if (!href) continue

    if (href.startsWith('/')) {
      // Absolute site link, checked by next build route checks.
      continue
    }

    const candidate = resolve(root, dirname(rel), href)
    if (!existsSync(candidate)) {
      console.error(`[check-links] Missing local target in ${rel}: ${rawHref}`)
      hasError = true
    }
  }
}

if (hasError) {
  process.exit(1)
}

console.log('[check-links] OK')
