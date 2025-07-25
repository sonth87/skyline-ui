import { defineConfig } from "tsup";

const useClientRegex = /['"]use client['"]\s?;/i;

export default defineConfig({
  entry: ["src/**/*.tsx", "src/lib/*.ts", "src/hooks/*.ts"],
  format: ["cjs", "esm"],
  minify: true,
  bundle: true,
  clean: true,
  dts: true,
  splitting: true,
  treeshake: true,
  esbuildPlugins: [
    {
      name: "use-client",
      setup(build) {
        build.onEnd((result) => {
          result.outputFiles?.forEach((file) => {
            if (file.text.match(useClientRegex)) {
              Object.defineProperty(file, "text", {
                value:
                  '"use client";\n' + file.text.replace(useClientRegex, ""),
              });
            }
          });
        });
      },
    },
  ],
});
