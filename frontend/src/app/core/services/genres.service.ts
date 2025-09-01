// genres.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseService } from './base.service';
import { Genre } from '../../models/Genre';

@Injectable({
  providedIn: 'root'
})
export class GenresService extends BaseService {
  constructor(protected override http: HttpClient) {
    super(http);
  }

  getAllGenres(): Observable<Genre[]> {
    return this.get<any>('genres').pipe(
      map(response => response.data || response)
    );
  }

  getGenreById(id: number): Observable<Genre> {
  return this.get<any>(`genres/${id}`).pipe(
    map(response => response.data || response)
  );
}

createGenre(genre: any): Observable<Genre> {
  return this.post<any>('genres', genre).pipe(
    map(response => response.data || response)
  );
}

updateGenre(id: number, genre: any): Observable<Genre> {
  return this.put<any>(`genres/${id}`, genre).pipe(
    map(response => response.data || response)
  );
}
}