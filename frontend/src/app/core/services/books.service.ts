import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseService } from './base.service';
import { Book } from '../../models/book';
import { CreateBookRequest } from '../../models/CreateBookRequest';
import { UpdateBookRequest } from '../../models/UpdateBookRequest';

@Injectable({
  providedIn: 'root'
})
export class BooksService extends BaseService {
  constructor(protected override http: HttpClient) {
    super(http);
  }

  getAllBooks(): Observable<Book[]> {
    return this.get<any>('books').pipe(
      map(response => {
        console.log('Books API Response:', response);
        return response.data || response;
      })
    );
  }

  getBookById(id: number): Observable<Book> {
    return this.get<any>(`books/${id}`).pipe(
      map(response => response.data || response)
    );
  }

  searchBooksByTitle(title: string): Observable<Book[]> {
    return this.get<any>(`books/title/${title}`).pipe(
      map(response => response.data || response)
    );
  }

  getBookByIsbn(isbn: string): Observable<Book> {
    return this.get<any>(`books/isbn/${isbn}`).pipe(
      map(response => response.data || response)
    );
  }

  getAvailableBooks(): Observable<Book[]> {
    return this.get<any>('books/available/books').pipe(
      map(response => response.data || response)
    );
  }

  searchBooks(query: string): Observable<Book[]> {
    return this.get<any>(`books/search/${query}`).pipe(
      map(response => response.data || response)
    );
  }

  getBooksByGenre(genre: string): Observable<Book[]> {
    return this.get<any>(`books/genre/${genre}`).pipe(
      map(response => response.data || response)
    );
  }

  searchBooksByGenre(genre: string): Observable<Book[]> {
    return this.get<any>(`books/genre/search/${genre}`).pipe(
      map(response => response.data || response)
    );
  }

  createBook(book: CreateBookRequest): Observable<Book> {
    return this.post<any>('books', book).pipe(
      map(response => response.data || response)
    );
  }

  updateBook(id: number, book: UpdateBookRequest): Observable<Book> {
    return this.put<any>(`books/${id}`, book).pipe(
      map(response => response.data || response)
    );
  }

  deleteBook(id: number): Observable<any> {
    return this.delete<any>(`${id}`).pipe(
      map(response => {
        // Algunas APIs devuelven { message: "Libro eliminado" } o similar
        return response;
      })
    );
  }
}