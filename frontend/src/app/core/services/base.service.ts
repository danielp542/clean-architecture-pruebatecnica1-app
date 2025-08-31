import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {HttpResponse} from '../../models/http-response';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  protected apiUrl = environment.apiUrl; // URL base de la API

  constructor(protected http: HttpClient) {}

  // Método GET genérico
  protected get<T>(endpoint: string, params?: HttpParams): Observable<HttpResponse<T>> {
    return this.http.get<HttpResponse<T>>(`${this.apiUrl}/${endpoint}`, { params });
  }

  // Método POST genérico
  protected post<T>(endpoint: string, body: any, headers?: HttpHeaders): Observable<HttpResponse<T>> {
    return this.http.post<HttpResponse<T>>(`${this.apiUrl}/${endpoint}`, body, { headers });
  }

  // Método PUT genérico
  protected put<T>(endpoint: string, body: any, headers?: HttpHeaders): Observable<HttpResponse<T>> {
    return this.http.put<HttpResponse<T>>(`${this.apiUrl}/${endpoint}`, body, { headers });
  }

  // Método DELETE genérico
  protected delete<T>(endpoint: string, headers?: HttpHeaders): Observable<HttpResponse<T>> {
    return this.http.delete<HttpResponse<T>>(`${this.apiUrl}/${endpoint}`, { headers });
  }
}
