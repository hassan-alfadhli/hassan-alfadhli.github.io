import { defineConfig } from "vite";
import path from "path";
import purgecss from "@fullhuman/postcss-purgecss";
import { renderFile } from "pug";

const pugPlugin = {
    name: "vite-plugin-pug",
    handleHotUpdate({ file, server }) {
        if (file.endswith(".pug")) {
            server.ws.send({ type: "full-reload" });
        }
    },
    transformIndexHtml: {
        order: "pre",
        handler(html, { path: relativePath, filename: absolutePath }) {
            const basedir = absolutePath.slice(0, -relativePath.length);
            return html.replace(/<pug.+?src="(.+?)".*?\/.*?>/gi, (_, pugFile) => {
                if (path.isAbsolute(pugFile)) {
                    const rootLength = path.parse(pugFile).root.length;
                    pugFile = path.join(basedir, pugFile.slice(rootLength));
                } else {
                    pugFile = path.join(path.dirname(absolutePath), pugFile);
                }
                return renderFile(pugFile, { basedir });
            });
        },
    },
};

export default defineConfig(({ command }) => {
    const config = {
        root: path.resolve(__dirname, "src"),
        publicDir: path.resolve(__dirname, "public"),
        build: {
            outDir: path.resolve(__dirname, "docs"),
            emptyOutDir: true,
        },
        server: {
            port: 8080,
        },
        plugins: [
            pugPlugin,
        ],
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
