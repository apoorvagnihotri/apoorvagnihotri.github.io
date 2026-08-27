import { getCollection } from "astro:content";

export const getWorkEntries = async () =>
  (await getCollection("work"))
    .filter((entry) => import.meta.env.DEV || !entry.data.draft)
    .sort(
      (a, b) =>
        b.data.year - a.data.year ||
        a.data.title.localeCompare(b.data.title),
    );

export const getFeaturedWorkEntries = async () =>
  (await getWorkEntries())
    .filter((entry) => entry.data.featuredOrder !== undefined)
    .sort(
      (a, b) =>
        (a.data.featuredOrder ?? Number.MAX_SAFE_INTEGER) -
        (b.data.featuredOrder ?? Number.MAX_SAFE_INTEGER),
    );
