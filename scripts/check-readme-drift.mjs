import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const root = process.cwd()

const requiredReadmeHeadings = [
  '## Install',
  '## Core Sync API',
  '## Core Async AI API',
  '## TanStack Start AI Helper',
  '## API Key Handling',
  '## React Wrapper',
  '## Solid Wrapper',
  '## Vue/Nuxt Wrapper'
]

const referenceFiles = [
  'pages/docs/reference/core-api.md',
  'pages/docs/reference/framework-wrappers.md',
  'pages/docs/reference/tanstack-helper.md',
  'pages/docs/reference/types.md'
]

function fail(message) {
  console.error(`[readme-drift] ${message}`)
  process.exitCode = 1
}

const canonicalPath = resolve(root, 'pages/docs/reference/canonical-readme.md')
if (!existsSync(canonicalPath)) {
  fail('Missing canonical README snapshot: pages/docs/reference/canonical-readme.md')
} else {
  const content = readFileSync(canonicalPath, 'utf8')
  for (const heading of requiredReadmeHeadings) {
    if (!content.includes(heading)) {
      fail(`Canonical README snapshot missing heading: ${heading}`)
    }
  }
}

for (const file of referenceFiles) {
  const fullPath = resolve(root, file)
  if (!existsSync(fullPath)) {
    fail(`Missing reference file: ${file}`)
    continue
  }

  const content = readFileSync(fullPath, 'utf8')
  if (!content.includes('https://github.com/vedaterenoglu/post-meta-extractor/blob/main/README.md#')) {
    fail(`Reference file must link canonical README anchors: ${file}`)
  }
}

if (process.exitCode) {
  process.exit(process.exitCode)
}

console.log('[readme-drift] OK')
