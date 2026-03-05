import path from 'node:path'
import { fileURLToPath } from 'node:url'
import nextra from 'nextra'

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx'
})

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default withNextra({
  output: 'export',
  images: {
    unoptimized: true
  },
  basePath: '/post-meta-data-extractor-docs',
  assetPrefix: '/post-meta-data-extractor-docs',
  outputFileTracingRoot: __dirname
})
