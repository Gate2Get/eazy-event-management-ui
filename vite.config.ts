import { CommonServerOptions, defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const serverConfig: CommonServerOptions = {};

if (!process.env.REACT_APP_ENV) {
  serverConfig.proxy = {
    "/api/v1/app": {
      target: "http://localhost:8080",
      changeOrigin: true,
      secure: false,
      ws: true,
      rewrite: (path) => path.replace("/api/v1/app", "/api/v1"),
    },
    "/api/v1/service": {
      target: "http://localhost:5001",
      changeOrigin: true,
      secure: false,
      ws: true,
    },
  };
} else if (process.env.REACT_APP_ENV === "Dev") {
  serverConfig.proxy = {
    "/api": {
      target: "http://eazy-event-dev-api.ap-south-1.elasticbeanstalk.com",
      changeOrigin: true,
      secure: false,
      ws: true,
    },
  };
} else if (process.env.REACT_APP_ENV === "Prod") {
  serverConfig.proxy = {
    "/api/v1/app": {
      target: "http://65.2.3.93:8080",
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
