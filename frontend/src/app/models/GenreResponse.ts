import { Genre } from "./Genre";

export interface GenreResponse extends Genre {
  books_count?: number;
}