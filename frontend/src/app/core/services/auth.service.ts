import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import {HttpResponse} from '../../models/http-response';
import {AuthenticateDto} from '../../models/authenticate-dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {
  constructor(protected override http: HttpClient) {
    super(http);
  }

 login(credentials: { email: string; password: string }): Observable<AuthenticateDto> {
  return this.http.post<AuthenticateDto>(
    `${this.apiUrl}/auth/login`,
    credentials
  );
}


  register(data: any): Observable<any> {
    return this.post('auth/register', data);
  }
}
