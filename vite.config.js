import { defineConfig } from "vite";
import path from "path";
import purgecss from "@fullhuman/postcss-purgecss";

export default defineConfig(({ command }) => {
    const config = {
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

                ],
            },
        },
    };
    if (command === "build") {
        config.css.postcss.plugins.push(
            purgecss({
                content: ["./**/*.html"],
                safelist: ["data-bs-theme"],
            }),
        );
    }
    return config;
});
