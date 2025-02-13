export interface Book {
  id: string;
  title: string;
  author: string;
  pageCount: number;
  genres?: Genre[];
  status?: Status;
  currentPage: number;
  dateAdded: number;
  //computed:
  readingProgress?: number;
  daysInProgress?: number;
}
export interface displayTabType {
  id: Tab;
  displayText: string;
}

export const displayTabs: displayTabType[] = [
  {
    id: "add",
    displayText: "Add a Book",
  },
  {
    id: "library",
    displayText: "View Library",
  },
  {
    id: "overview",
    displayText: "Reading Metrics",
  },
];

export type Genre =
  | "fiction"
  | "non-fiction"
  | "mystery"
  | "romance"
  | "science-fiction"
  | "fantasy"
  | "thriller"
  | "horror"
  | "historical"
  | "biography"
  | "self-help"
  | "drama"
  | "adventure"
  | "children"
  | "young-adult"
  | "poetry"
  | "crime"
  | "comedy"
  | "business"
  | "literary";

export const genres: Genre[] = [
  "fiction",
  "non-fiction",
  "mystery",
  "romance",
  "science-fiction",
  "fantasy",
  "thriller",
  "horror",
  "historical",
  "biography",
  "self-help",
  "drama",
  "adventure",
  "children",
  "young-adult",
  "poetry",
  "crime",
  "comedy",
  "business",
  "literary",
];

export type Status = "not started" | "in progress" | "finished" | "given up";

export const statuses: Status[] = [
  "not started",
  "in progress",
  "finished",
  "given up",
];

export type Tab = "add" | "library" | "overview";

export const MAX_PAGE_COUNT = 10000;
export const MAX_TITLE_LENGTH = 100;
export const MAX_AUTHOR_LENGTH = 100;
