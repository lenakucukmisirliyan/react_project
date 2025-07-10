import { defineConfig, transformWithEsbuild } from "vite";
import react from "@vitejs/plugin-react";
import basicSsl from "@vitejs/plugin-basic-ssl";

export default defineConfig(() => ({
  plugins: [
    {
      name: "treat-js-files-as-jsx",
      async transform(code, id) {
        if (!id.match(/src\/.*\.js$/)) return null;
        return transformWithEsbuild(code, id, {
          loader: "jsx",
          jsx: "automatic",
        });
      },
    },
    react(),
    basicSsl({
      name: "eipweb",
      domains: ["*.epias.com.tr"],
    }),
  ],
  server: {
    port: 3000,
    https: true,
    host: "localhost",  // Burayı "my.epias.com.tr" yerine "localhost" yaptım
    hmr: {
      protocol: "wss",
      host: "localhost",  // Aynı şekilde burada da "localhost"
      clientPort: 3000,
      overlay: true,
    },
    watch: {
      usePolling: true,
    },
    proxy: {
      "/api": {
        target: "http://localhost:5000", // Backend gerçek portunu buraya yaz (örnek 5000)
        changeOrigin: true,
        secure: false, // Backend sertifikası self-signed ise false yap
      },
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        ".js": "jsx",
      },
    },
  },
  build: {
    outDir: "build",
  },
  css: {
    preprocessorOptions: {
      scss: {
        javascriptEnabled: true,
        api: "modern-compiler",
        includePaths: ['node_modules'],
      },
    },
  },
  resolve: {
    alias: {
      app: "/src/app",
      constants: "/src/constants",
      features: "/src/features",
      locales: "/src/locales",
      pages: "/src/pages",
      styles: "/src/styles",
      components: "/src/components",
      assets: "/src/assets",
      services: "/src/services",
      hooks: "/src/hooks",
      utils: "/src/utils",
    },
  },
}));
