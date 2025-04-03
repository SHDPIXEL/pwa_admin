import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server:{
    host: '0.0.0.0',  // Exposes the server to the local network
    port: 3000,  // Optional: set a custom port
  },
  optimizeDeps: {
    include: ["xlsx"],
  },
})
