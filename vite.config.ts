import { CommonServerOptions, defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const serverConfig: CommonServerOptions = {};

if (!process.env.REACT_APP_ENV) {
  serverConfig.proxy = {
    "/api": {
      target: "http://localhost:8080",
      changeOrigin: true,
      secure: false,
      ws: true,
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    ...serverConfig,
  },
});