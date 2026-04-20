import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [react()],
    server: { // Para que funcione ngrok
      allowedHosts: [
        env.VITE_ALLOWED_HOST
      ]
    }
  }
})

