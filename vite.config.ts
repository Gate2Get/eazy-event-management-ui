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
} else if (process.env.REACT_APP_ENV === "Dev") {
  serverConfig.proxy = {
    "/api": {
      target: "http://eazy-event-dev-api.ap-south-1.elasticbeanstalk.com",
      changeOrigin: true,
      secure: false,
      ws: true,
      rewrite: (path) => path.replace("/api/v1/app", "/api/v1"),
    },
  };
} else if (process.env.REACT_APP_ENV === "Prod") {
  serverConfig.proxy = {
    "/api/v1/app": {
      target: "http://65.2.3.93:8080",
      changeOrigin: true,
      secure: false,
      ws: true,
      rewrite: (path) => path.replace("/api/v1/app", "/api/v1"),
    },
    "/api/v1/service": {
      target: "http://65.2.3.93:5000",
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
