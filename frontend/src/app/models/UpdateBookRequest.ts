// UpdateBookRequest.ts
export interface UpdateBookRequest {
  title: string;
  isbn: string;
  published_year: number;
  available_copies: number;
  author_ids: number[];
  genre_ids: number[];
}