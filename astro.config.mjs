import { defineConfig, fontProviders } from "astro/config";

const isGitHubPages = process.env.GITHUB_PAGES === "true";

export default defineConfig({
  site: isGitHubPages ? "https://apoorvagnihotri.github.io" : undefined,
  base: isGitHubPages ? "/personal-website" : "/",
  fonts: [
    {
      provider: fontProviders.fontshare(),
      name: "Array",
      cssVariable: "--font-array",
      weights: [400],
      styles: ["normal"],
      subsets: ["latin"],
      fallbacks: ["sans-serif"],
    },
  ],
});
