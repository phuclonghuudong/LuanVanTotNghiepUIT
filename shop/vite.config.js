import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import {defineConfig} from "vite";

// https://vite.dev/config/
export default defineConfig({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // ← rất quan trọng
  ],
  plugins: [react(), tailwindcss(),
  build: {
    outDir: "dist",
  },],
});
