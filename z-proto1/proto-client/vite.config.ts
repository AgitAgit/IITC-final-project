import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  //tried this, did not work
  // server: {
  //   watch: {
  //     usePolling: true
  //   }
  // }
})
