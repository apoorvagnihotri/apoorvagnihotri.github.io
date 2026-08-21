import { defineConfig } from "astro/config";

const isGitHubPages = process.env.GITHUB_PAGES === "true";

export default defineConfig({
  site: isGitHubPages ? "https://apoorvagnihotri.github.io" : undefined,
  base: isGitHubPages ? "/personal-website" : "/",
});
