import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BaseService } from './base.service';
import { HttpResponse } from '../../models/http-response';
import { AuthenticateDto } from '../../models/authenticate-dto';
import { User } from '../../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(protected override http: HttpClient) {
    super(http);
    // Intentar recuperar el usuario del localStorage/sessionStorage al inicializar
    this.loadStoredUser();
  }

  login(credentials: { email: string; password: string }): Observable<AuthenticateDto> {
    return this.http.post<AuthenticateDto>(
      `${this.apiUrl}/auth/login`,
      credentials
    ).pipe(
      tap(response => {
        if (response?.access_token) {
          // Guardar token
          sessionStorage.setItem('authToken', response.access_token);
          
          // Guardar información del usuario
          if (response.user) {
            sessionStorage.setItem('currentUser', JSON.stringify(response.user));
            
          }
        }
      })
    );
  }

  logout(): void {
    // Limpiar storage
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  getToken(): string | null {
    return sessionStorage.getItem('authToken');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  private loadStoredUser(): void {
    const storedUser = sessionStorage.getItem('currentUser');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        this.currentUserSubject.next(user);
      } catch (error) {
        console.error('Error parsing stored user:', error);
        this.logout();
      }
    }
  }

  register(data: any): Observable<any> {
    return this.post('auth/register', data);
  }
}