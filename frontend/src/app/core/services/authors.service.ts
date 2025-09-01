import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseService } from './base.service';
import { Author } from '../../models/Author';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService extends BaseService {
  constructor(protected override http: HttpClient) {
    super(http);
  }

  getAllAuthors(): Observable<Author[]> {
    return this.get<any>('authors').pipe(
      map(response => {
        console.log('Authors API Response:', response);
        
        // Extraer los autores de la estructura anidada
        if (response.data && Array.isArray(response.data)) {
          return response.data.map((item: any) => {
            // Si cada item tiene la propiedad 'original', usamos esa
            if (item.original) {
              return item.original;
            }
            return item;
          });
        }
        
        return response.data || response;
      })
    );
  }

  getAuthorById(id: number): Observable<Author> {
  return this.get<any>(`authors/${id}`).pipe(
    map(response => {
      console.log('Author by ID Response:', response);
      
      // Extraer el autor de la estructura anidada
      if (response.data && response.data.original) {
        return response.data.original;
      }
      return response.data || response;
    })
  );
}

  searchAuthors(name: string): Observable<Author[]> {
    return this.get<any>(`authors/search/${name}`).pipe(
      map(response => {
        if (response.data && Array.isArray(response.data)) {
          return response.data.map((item: any) => {
            if (item.original) {
              return item.original;
            }
            return item;
          });
        }
        return response.data || response;
      })
    );
  }

  createAuthor(author: any): Observable<Author> {
    return this.post<any>('authors', author).pipe(
      map(response => {
        if (response.data && response.data.original) {
          return response.data.original;
        }
        return response.data || response;
      })
    );
  }

  updateAuthor(id: number, author: any): Observable<Author> {
    return this.put<any>(`authors/${id}`, author).pipe(
      map(response => {
        if (response.data && response.data.original) {
          return response.data.original;
        }
        return response.data || response;
      })
    );
  }

  deleteAuthor(id: number): Observable<any> {
    return this.delete<any>(`authors/${id}`).pipe(
      map(response => response)
    );
  }
}