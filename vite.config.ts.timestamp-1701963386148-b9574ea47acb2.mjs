// vite.config.ts
import { defineConfig } from "file:///Users/s0n03ld/GitHub/eazy-event-management-ui/node_modules/vite/dist/node/index.js";
import react from "file:///Users/s0n03ld/GitHub/eazy-event-management-ui/node_modules/@vitejs/plugin-react/dist/index.mjs";
var serverConfig = {};
if (!process.env.REACT_APP_ENV) {
  serverConfig.proxy = {
    "/api/v1/app": {
      target: "http://localhost:8080",
      changeOrigin: true,
      secure: false,
      ws: true,
      rewrite: (path) => path.replace("/api/v1/app", "/api/v1")
    },
    "/api/v1/service": {
      target: "http://localhost:5001",
      changeOrigin: true,
      secure: false,
      ws: true,
      rewrite: (path) => path.replace("/api/v1/app", "/api/v1")
    }
  };
} else if (process.env.REACT_APP_ENV === "Dev") {
  serverConfig.proxy = {
    "/api": {
      target: "http://eazy-event-dev-api.ap-south-1.elasticbeanstalk.com",
      changeOrigin: true,
      secure: false,
      ws: true,
      rewrite: (path) => path.replace("/api/v1/app", "/api/v1")
    }
  };
} else if (process.env.REACT_APP_ENV === "Prod") {
  serverConfig.proxy = {
    "/api/v1/app": {
      target: "http://65.2.3.93:8080",
      changeOrigin: true,
      secure: false,
      ws: true,
      rewrite: (path) => path.replace("/api/v1/app", "/api/v1")
    },
    "/api/v1/service": {
      target: "http://65.2.3.93:5000",
      changeOrigin: true,
      secure: false,
      ws: true,
      rewrite: (path) => path.replace("/api/v1/app", "/api/v1")
    }
  };
}
var vite_config_default = defineConfig({
  plugins: [react()],
  server: {
    port: 3e3,
    ...serverConfig
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvczBuMDNsZC9HaXRIdWIvZWF6eS1ldmVudC1tYW5hZ2VtZW50LXVpXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvczBuMDNsZC9HaXRIdWIvZWF6eS1ldmVudC1tYW5hZ2VtZW50LXVpL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9zMG4wM2xkL0dpdEh1Yi9lYXp5LWV2ZW50LW1hbmFnZW1lbnQtdWkvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBDb21tb25TZXJ2ZXJPcHRpb25zLCBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiO1xuXG5jb25zdCBzZXJ2ZXJDb25maWc6IENvbW1vblNlcnZlck9wdGlvbnMgPSB7fTtcblxuaWYgKCFwcm9jZXNzLmVudi5SRUFDVF9BUFBfRU5WKSB7XG4gIHNlcnZlckNvbmZpZy5wcm94eSA9IHtcbiAgICBcIi9hcGkvdjEvYXBwXCI6IHtcbiAgICAgIHRhcmdldDogXCJodHRwOi8vbG9jYWxob3N0OjgwODBcIixcbiAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcbiAgICAgIHNlY3VyZTogZmFsc2UsXG4gICAgICB3czogdHJ1ZSxcbiAgICAgIHJld3JpdGU6IChwYXRoKSA9PiBwYXRoLnJlcGxhY2UoXCIvYXBpL3YxL2FwcFwiLCBcIi9hcGkvdjFcIiksXG4gICAgfSxcbiAgICBcIi9hcGkvdjEvc2VydmljZVwiOiB7XG4gICAgICB0YXJnZXQ6IFwiaHR0cDovL2xvY2FsaG9zdDo1MDAxXCIsXG4gICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXG4gICAgICBzZWN1cmU6IGZhbHNlLFxuICAgICAgd3M6IHRydWUsXG4gICAgICByZXdyaXRlOiAocGF0aCkgPT4gcGF0aC5yZXBsYWNlKFwiL2FwaS92MS9hcHBcIiwgXCIvYXBpL3YxXCIpLFxuICAgIH0sXG4gIH07XG59IGVsc2UgaWYgKHByb2Nlc3MuZW52LlJFQUNUX0FQUF9FTlYgPT09IFwiRGV2XCIpIHtcbiAgc2VydmVyQ29uZmlnLnByb3h5ID0ge1xuICAgIFwiL2FwaVwiOiB7XG4gICAgICB0YXJnZXQ6IFwiaHR0cDovL2VhenktZXZlbnQtZGV2LWFwaS5hcC1zb3V0aC0xLmVsYXN0aWNiZWFuc3RhbGsuY29tXCIsXG4gICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXG4gICAgICBzZWN1cmU6IGZhbHNlLFxuICAgICAgd3M6IHRydWUsXG4gICAgICByZXdyaXRlOiAocGF0aCkgPT4gcGF0aC5yZXBsYWNlKFwiL2FwaS92MS9hcHBcIiwgXCIvYXBpL3YxXCIpLFxuICAgIH0sXG4gIH07XG59IGVsc2UgaWYgKHByb2Nlc3MuZW52LlJFQUNUX0FQUF9FTlYgPT09IFwiUHJvZFwiKSB7XG4gIHNlcnZlckNvbmZpZy5wcm94eSA9IHtcbiAgICBcIi9hcGkvdjEvYXBwXCI6IHtcbiAgICAgIHRhcmdldDogXCJodHRwOi8vNjUuMi4zLjkzOjgwODBcIixcbiAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcbiAgICAgIHNlY3VyZTogZmFsc2UsXG4gICAgICB3czogdHJ1ZSxcbiAgICAgIHJld3JpdGU6IChwYXRoKSA9PiBwYXRoLnJlcGxhY2UoXCIvYXBpL3YxL2FwcFwiLCBcIi9hcGkvdjFcIiksXG4gICAgfSxcbiAgICBcIi9hcGkvdjEvc2VydmljZVwiOiB7XG4gICAgICB0YXJnZXQ6IFwiaHR0cDovLzY1LjIuMy45Mzo1MDAwXCIsXG4gICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXG4gICAgICBzZWN1cmU6IGZhbHNlLFxuICAgICAgd3M6IHRydWUsXG4gICAgICByZXdyaXRlOiAocGF0aCkgPT4gcGF0aC5yZXBsYWNlKFwiL2FwaS92MS9hcHBcIiwgXCIvYXBpL3YxXCIpLFxuICAgIH0sXG4gIH07XG59XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbcmVhY3QoKV0sXG4gIHNlcnZlcjoge1xuICAgIHBvcnQ6IDMwMDAsXG4gICAgLi4uc2VydmVyQ29uZmlnLFxuICB9LFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTRULFNBQThCLG9CQUFvQjtBQUM5VyxPQUFPLFdBQVc7QUFFbEIsSUFBTSxlQUFvQyxDQUFDO0FBRTNDLElBQUksQ0FBQyxRQUFRLElBQUksZUFBZTtBQUM5QixlQUFhLFFBQVE7QUFBQSxJQUNuQixlQUFlO0FBQUEsTUFDYixRQUFRO0FBQUEsTUFDUixjQUFjO0FBQUEsTUFDZCxRQUFRO0FBQUEsTUFDUixJQUFJO0FBQUEsTUFDSixTQUFTLENBQUMsU0FBUyxLQUFLLFFBQVEsZUFBZSxTQUFTO0FBQUEsSUFDMUQ7QUFBQSxJQUNBLG1CQUFtQjtBQUFBLE1BQ2pCLFFBQVE7QUFBQSxNQUNSLGNBQWM7QUFBQSxNQUNkLFFBQVE7QUFBQSxNQUNSLElBQUk7QUFBQSxNQUNKLFNBQVMsQ0FBQyxTQUFTLEtBQUssUUFBUSxlQUFlLFNBQVM7QUFBQSxJQUMxRDtBQUFBLEVBQ0Y7QUFDRixXQUFXLFFBQVEsSUFBSSxrQkFBa0IsT0FBTztBQUM5QyxlQUFhLFFBQVE7QUFBQSxJQUNuQixRQUFRO0FBQUEsTUFDTixRQUFRO0FBQUEsTUFDUixjQUFjO0FBQUEsTUFDZCxRQUFRO0FBQUEsTUFDUixJQUFJO0FBQUEsTUFDSixTQUFTLENBQUMsU0FBUyxLQUFLLFFBQVEsZUFBZSxTQUFTO0FBQUEsSUFDMUQ7QUFBQSxFQUNGO0FBQ0YsV0FBVyxRQUFRLElBQUksa0JBQWtCLFFBQVE7QUFDL0MsZUFBYSxRQUFRO0FBQUEsSUFDbkIsZUFBZTtBQUFBLE1BQ2IsUUFBUTtBQUFBLE1BQ1IsY0FBYztBQUFBLE1BQ2QsUUFBUTtBQUFBLE1BQ1IsSUFBSTtBQUFBLE1BQ0osU0FBUyxDQUFDLFNBQVMsS0FBSyxRQUFRLGVBQWUsU0FBUztBQUFBLElBQzFEO0FBQUEsSUFDQSxtQkFBbUI7QUFBQSxNQUNqQixRQUFRO0FBQUEsTUFDUixjQUFjO0FBQUEsTUFDZCxRQUFRO0FBQUEsTUFDUixJQUFJO0FBQUEsTUFDSixTQUFTLENBQUMsU0FBUyxLQUFLLFFBQVEsZUFBZSxTQUFTO0FBQUEsSUFDMUQ7QUFBQSxFQUNGO0FBQ0Y7QUFHQSxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTLENBQUMsTUFBTSxDQUFDO0FBQUEsRUFDakIsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sR0FBRztBQUFBLEVBQ0w7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
