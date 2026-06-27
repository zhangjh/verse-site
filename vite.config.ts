import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { vitePrerenderPlugin } from 'vite-prerender-plugin'

export default defineConfig({
  base: '/',
  plugins: [
    react(),
    vitePrerenderPlugin({
      renderTarget: '#root',
      additionalPrerenderRoutes: [
        '/en',
        '/zh',
        '/en/features',
        '/zh/features',
        '/en/pricing',
        '/zh/pricing',
        '/en/download',
        '/zh/download',
        '/en/faq',
        '/zh/faq',
      ],
    }),
    {
      name: 'cleanup-prerender',
      enforce: 'post',
      generateBundle(_, bundle) {
        const prerenderKeys = Object.keys(bundle).filter(k => k.includes('prerender'))
        for (const key of prerenderKeys) {
          delete bundle[key]
        }
        for (const [key, asset] of Object.entries(bundle)) {
          if (key.endsWith('.html') && asset.type === 'asset' && typeof asset.source === 'string') {
            let cleaned = asset.source as string
            for (const pk of prerenderKeys) {
              const fileName = pk.replace(/\\/g, '/').split('/').pop()!
              cleaned = cleaned
                .replace(new RegExp(`\\s*<link[^>]*href="[^"]*${fileName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[^"]*"[^>]*>`, 'gi'), '')
            }
            cleaned = cleaned.replace(/\s*<script[^>]*\bprerender\b[^>]*>[^<]*<\/script>/gi, '')
            cleaned = cleaned.replace(/\s*<script[^>]*\bprerender\b[^>]*\/>/gi, '')
            asset.source = cleaned
          }
        }
      },
    },
    {
      name: 'force-exit',
      enforce: 'post',
      closeBundle() {
        process.exit(0)
      },
    },
  ],
})
