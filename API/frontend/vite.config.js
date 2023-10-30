import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {VitePWA} from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
    VitePWA({
      includeAssets: ['./public/school icon.jpg'],
      // registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },

      workbox: {
        globPatterns: ['**/*.{js, jsx,css,html,ico,png,svg}']
      }

    
    })
  ],
})
