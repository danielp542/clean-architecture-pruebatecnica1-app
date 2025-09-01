import { Author } from "./Author";
import { Genre } from "./Genre";
import { Loan } from "./Loan";

export interface Book {
  id?: number;
  title: string;
  isbn: string;
  published_year: number;
  copies_total: number;
  copies_available: number;
  authors?: Author[];
  genres?: Genre[];
  loans?: Loan[];
  available_copies: number;
  created_at?: string;
  updated_at?: string;
}