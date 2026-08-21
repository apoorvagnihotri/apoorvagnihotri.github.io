export const siteConfig = {
  name: "Apoorv Agnihotri",
  analytics: {
    googleMeasurementId: "G-EBZQ5EGPT5",
  },
} as const;

const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, "");

export const withBase = (path: string) => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${baseUrl}${normalizedPath}` || "/";
};

export const resolveSiteHref = (href: string) =>
  href.startsWith("/") ? withBase(href) : href;
