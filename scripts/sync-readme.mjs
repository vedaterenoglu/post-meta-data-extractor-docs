import { copyFileSync, readFileSync, writeFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { execSync } from 'node:child_process'

const root = process.cwd()
const upstreamRepo = process.argv[2] || resolve(root, '.upstream/post-meta-extractor')
const upstreamReadme = resolve(upstreamRepo, 'README.md')
const targetReadme = resolve(root, 'pages/docs/reference/canonical-readme.md')
const overviewPath = resolve(root, 'pages/docs/getting-started/overview.md')

if (!existsSync(upstreamReadme)) {
  throw new Error(`Upstream README not found: ${upstreamReadme}`)
}

const sha = execSync('git rev-parse --short HEAD', { cwd: upstreamRepo, encoding: 'utf8' }).trim()
copyFileSync(upstreamReadme, targetReadme)

if (existsSync(overviewPath)) {
  const current = readFileSync(overviewPath, 'utf8')
  const marker = `Last synced from README commit: \`${sha}\``
  if (/Last synced from README commit:\s*`[^`]+`/.test(current)) {
    writeFileSync(overviewPath, current.replace(/Last synced from README commit:\s*`[^`]+`/, marker))
  } else {
    writeFileSync(overviewPath, `${current.trim()}\n\n${marker}\n`)
  }
}

console.log(`[sync-readme] Synced README from ${sha}`)
