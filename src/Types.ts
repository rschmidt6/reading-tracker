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

export type Genre =
  | "drama"
  | "romance"
  | "thriller"
  | "historical"
  | "children";

export const genres: Genre[] = [
  "drama",
  "romance",
  "thriller",
  "historical",
  "children",
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
