import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/WaterPlant_PWA/',
  build: { outDir: 'docs' },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icons/*.png'],
      manifest: {
        name: 'Plant Watering Tracker',
        short_name: 'Watering',
        description: 'Track watering schedule for your plants',
        theme_color: '#4CAF50',
        background_color: '#FFFFFF',
        display: 'standalone',
        start_url: '/WaterPlant_PWA/',
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
        ]
      }
    })
  ]
})
