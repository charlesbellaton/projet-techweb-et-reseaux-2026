// =============================================================================
// vite.config.js — Configuration de Vite (outil de build React)
//
// Vite compile et sert l'application React en développement.
// Le proxy redirige les appels /api/* vers Flask (port 5000)
// pour éviter les problèmes CORS en développement.
// Ex : fetch('/api/plats') → http://localhost:5000/api/plats
// =============================================================================

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:5000'
    }
  }
})
