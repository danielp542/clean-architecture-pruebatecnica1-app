import { Book } from "./book";

export interface Genre {
  id?: number;
  name: string;
  description?: string;
  books?: Book[];
  created_at?: string;
  updated_at?: string;
}