import { Book } from "./book";

export interface BookResponse extends Book {
  is_available: boolean;
  genres_list: string;
  authors_list: string;
}