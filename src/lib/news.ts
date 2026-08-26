import type { NewsItem } from "../data/news";

export type MappedNewsItem = NewsItem & {
  mapCoordinates: NonNullable<NewsItem["mapCoordinates"]>;
};

const europeMapBounds = { west: -25, east: 50, north: 80, south: 28 };
const clamp = (value: number) => Math.min(1, Math.max(0, value));

export const projectToEuropeMap = (latitude: number, longitude: number) => ({
  x:
    clamp(
      (longitude - europeMapBounds.west) /
        (europeMapBounds.east - europeMapBounds.west),
    ) * 100,
  y:
    clamp(
      (europeMapBounds.north - latitude) /
        (europeMapBounds.north - europeMapBounds.south),
    ) * 100,
});

export const formatNewsDate = (
  date: string,
  precision: NewsItem["datePrecision"] = "day",
) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    timeZone: "UTC",
  };

  if (precision !== "year") options.month = "short";
  if (precision === "day") {
    options.weekday = "short";
    options.day = "numeric";
  }

  return new Intl.DateTimeFormat("en", options).format(
    new Date(`${date}T00:00:00Z`),
  );
};
