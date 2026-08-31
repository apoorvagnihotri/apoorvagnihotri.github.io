import { defineConfig, fontProviders } from "astro/config";

export default defineConfig({
  site: "https://apoorvagnihotri.github.io",
  base: "/",
  fonts: [
    {
      provider: fontProviders.google(),
      name: "Bungee Hairline",
      cssVariable: "--font-bungee-hairline",
      weights: [400],
      styles: ["normal"],
      subsets: ["latin"],
      fallbacks: ["sans-serif"],
    },
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
