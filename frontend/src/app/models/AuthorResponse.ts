import { Author } from "./Author";

export interface AuthorResponse extends Author {
  books_count?: number;
}