import { defineConfig } from 'vite'
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: ({ request, url }) => request.destination === "script" && 
    url.pathname.endsWith('.js'),
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "js-assets",
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 60 * 60,
              },
            },
          },
          {
            urlPattern: ({ request }) =>
              request.destination === "style" ||
              request.destination === "image" ||
              request.destination === "font",
            handler: "CacheFirst",
            options: {
              cacheName: "static-assets",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 7 * 24 * 60 * 60,
              },
            },
          },
        ],
      },
      includeAssets: [
        "**/*.{png,jpg,jpeg,webp,js,svg,woff2,css}"
      ],
    }),
  ],
  server: {
    host: true,
    port: 5173
  }
});