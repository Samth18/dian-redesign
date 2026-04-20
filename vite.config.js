import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: { //Para que funcione ngrok
    allowedHosts: [
      'adopted-quentin-frowsty.ngrok-free.dev'
    ]
  }
})
