// CreateBookRequest.ts
export interface CreateBookRequest {
  title: string;
  isbn: string;
  published_year: number;
  available_copies: number;
  author_ids: number[];
  genre_ids: number[];
}