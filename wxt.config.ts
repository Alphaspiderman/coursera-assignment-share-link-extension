import { defineConfig, defineRunnerConfig } from "wxt";
import { resolve } from "node:path";

// See https://wxt.dev/api/config.html
export default defineConfig({
  extensionApi: "chrome",
  manifest: {
    permissions: ["storage", "webRequest"],
  },
  runner: defineRunnerConfig({
    // On Windows, the path must be absolute
    chromiumProfile: resolve(".wxt/chrome-data"),
    keepProfileChanges: true,
  }),
});
