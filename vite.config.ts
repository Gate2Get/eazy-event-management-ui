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
      rewrite: (path) => path.replace("/api/v1/service", "/api/v1"),
    },
    "/api/v1/payment": {
      target: "http://localhost:5005",
      changeOrigin: true,
      secure: false,
      ws: true,
      rewrite: (path) => path.replace("/api/v1/payment", "/api/v1"),
    },
    "/api/v1/pincode": {
      target: "https://api.data.gov.in",
      changeOrigin: true,
      secure: false,
      ws: true,
      rewrite: (path) =>
        path.replace(
          "/api/v1/pincode/",
          "/resource/6176ee09-3d56-4a3b-8115-21841576b2f6?api-key=579b464db66ec23bdd00000158c795c365854bf0760494d1528908d5&format=json&filters%5Bpincode%5D="
        ),
    },
  };
} else if (process.env.REACT_APP_ENV) {
  serverConfig.proxy = {
    "/api/v1/app": {
      target: `http://${process.env.PUBLIC_IP}:8080`,
      changeOrigin: true,
      secure: false,
      ws: true,
      rewrite: (path) => path.replace("/api/v1/app", "/api/v1"),
    },
    "/api/v1/service": {
      target: `http://${process.env.PUBLIC_IP}:5000`,
      changeOrigin: true,
      secure: false,
      ws: true,
      rewrite: (path) => path.replace("/api/v1/service", "/api/v1"),
    },
    "/api/v1/pincode": {
      target: "https://api.data.gov.in",
      changeOrigin: true,
      secure: false,
      ws: true,
      rewrite: (path) =>
        path.replace(
          "/api/v1/pincode/",
          "/resource/6176ee09-3d56-4a3b-8115-21841576b2f6?api-key=579b464db66ec23bdd00000158c795c365854bf0760494d1528908d5&format=json&filters%5Bpincode%5D="
        ),
    },
    "/api/v1/payment": {
      target: `http://${process.env.PUBLIC_IP}:5005`,
      changeOrigin: true,
      secure: false,
      ws: true,
      rewrite: (path) => path.replace("/api/v1/payment", "/api/v1"),
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
  optimizeDeps: {
    include: [
      "html2canvas", // Ensure html2canvas is included here if it's a direct import
      "jspdf", // Ensure jspdf is included here if it's a direct import
    ],
  },
});
