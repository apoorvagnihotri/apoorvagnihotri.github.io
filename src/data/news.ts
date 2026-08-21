export type NewsItem = {
  title: string;
  type:
    | "career"
    | "conference"
    | "education"
    | "publication"
    | "race"
    | "talk"
    | "teaching"
    | "visit";
  startDate: string;
  endDate?: string;
  datePrecision?: "day" | "month" | "year";
  location?: string;
  description?: string;
  href?: string;
  contactLabel?: string;
  contactHref?: string;
  mapCoordinates?: {
    latitude: number;
    longitude: number;
    labelPlacement?: "above-left" | "above-right" | "below-left" | "below-right";
  };
};

// Add news items here using ISO dates (YYYY-MM-DD). The homepage groups them
// into current/upcoming, recent, and archive entries in the visitor's browser.
// For an item to appear on the Europe map, add the city's latitude and longitude.
export const newsItems: NewsItem[] = [
  {
    title: "Lausanne Marathon",
    type: "race",
    startDate: "2026-10-25",
    location: "Lausanne, Switzerland",
    description: "Running the marathon - definitely.",
    href: "https://en.lausanne-marathon.com",
    contactLabel: "Also in town? Let’s get coffee.",
    contactHref: "mailto:apoorvagni@gmail.com?subject=Coffee%20in%20Lausanne",
    mapCoordinates: {
      latitude: 46.5197,
      longitude: 6.6323,
      labelPlacement: "below-left",
    },
  },
  {
    title: "Espoo Rantamaraton",
    type: "race",
    startDate: "2026-09-19",
    location: "Espoo, Finland",
    description: "Running the marathon - hopefully.",
    href: "https://www.rantamaraton.fi/in-english/",
    contactLabel: "Also in town? Let’s get coffee.",
    contactHref: "mailto:apoorvagni@gmail.com?subject=Coffee%20in%20Espoo",
    mapCoordinates: {
      latitude: 60.2055,
      longitude: 24.6559,
      labelPlacement: "above-right",
    },
  },
  {
    title: "Cyber Valley Day 2026",
    type: "conference",
    startDate: "2026-09-09",
    location: "Tübingen, Germany",
    description: "I will be at Cyber Valley Day for its ten-year anniversary.",
    href: "https://cyber-valley.de/en/events/cyber-valley-day-2026",
    mapCoordinates: {
      latitude: 48.5216,
      longitude: 9.0576,
      labelPlacement: "above-right",
    },
  },
  {
    title: "Submitted my master’s thesis",
    type: "education",
    startDate: "2026-06-30",
    location: "Tübingen, Germany",
    description:
      "Evaluating AI-Supported Planning for Differentiated Mathematics Homework, completed with the Robust Machine Learning Group.",
    href: "/files/master-thesis-apoorv-agnihotri.pdf",
  },
  {
    title: "Left Mercedes-Benz",
    type: "career",
    startDate: "2025-05-31",
    datePrecision: "month",
    location: "Böblingen, Germany",
    description: "Concluded my role as an AI Research working student.",
  },
  {
    title: "Joined Mercedes-Benz",
    type: "career",
    startDate: "2024-08-01",
    datePrecision: "month",
    location: "Böblingen, Germany",
    description: "Joined as an AI Research working student.",
  },
  {
    title: "Started a master’s in Machine Learning",
    type: "education",
    startDate: "2023-10-14",
    location: "Tübingen, Germany",
    description: "Joined the University of Tübingen as a master’s student.",
    href: "https://uni-tuebingen.de/en/study/finding-a-course/degree-programs-available/detail/course/machine-learning-master/",
  },
  {
    title: "Guest lecture on diffusion models",
    type: "talk",
    startDate: "2022-11-18",
    location: "IIT Gandhinagar",
    description: "Gave a guest lecture for the Probabilistic Machine Learning course.",
  },
  {
    title: "NeurIPS workshop paper accepted",
    type: "publication",
    startDate: "2022-10-21",
    description: "A workshop paper about machine-learning deployment challenges at Wadhwani AI.",
    href: "https://arxiv.org/abs/2208.06359",
  },
  {
    title: "Joined Rephrase AI",
    type: "career",
    startDate: "2022-04-01",
    location: "Bangalore, India",
    description: "Joined as a Deep Learning Researcher.",
  },
  {
    title: "Presented Wadhwani AI’s work on World TB Day",
    type: "talk",
    startDate: "2021-03-24",
    location: "Ambedkar International Centre, New Delhi",
  },
  {
    title: "Volunteered at ICML 2020",
    type: "conference",
    startDate: "2020-07-05",
    href: "https://icml.cc/Conferences/2020",
  },
  {
    title: "Joined Wadhwani AI",
    type: "career",
    startDate: "2020-06-01",
    location: "India",
    description: "Joined as a Research Fellow.",
  },
  {
    title: "Exploring Bayesian Optimization published in Distill",
    type: "publication",
    startDate: "2020-05-05",
    href: "https://distill.pub/2020/bayesian-optimization/",
  },
  {
    title: "Bayesian optimization article accepted at Distill",
    type: "publication",
    startDate: "2020-03-18",
  },
  {
    title: "Selected for the Wadhwani AI Research Fellowship",
    type: "career",
    startDate: "2020-02-28",
  },
];
