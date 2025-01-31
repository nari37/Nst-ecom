import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: process.env.PORT || 5173, // Use the PORT variable provided by Render
  },
});
