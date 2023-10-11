import { defineConfig } from "vite";
import path from "path";
import purgecss from "@fullhuman/postcss-purgecss";

export default defineConfig({
    root: path.resolve(__dirname, "src"),
    build: {
        outDir: "../docs",
        emptyOutDir: true,
    },
    publicDir: "../public",
    server: {
        port: 8080,
    },
    css: {
        postcss: {
            plugins: [
                purgecss({
                    content: ["./**/*.html"],
                }),
            ],
        },
    },
});
