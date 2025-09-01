import { Injectable } from '@angular/core';
import {BaseService} from './base.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {HttpResponse} from '../../models/http-response';
import {SubscriptionTypeDto} from '../../models/subscription-type-dto';
import {UserDto} from '../../models/user-dto';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService{

  constructor(protected override http: HttpClient) {
    super(http);
  }

  getInfoUser(): Observable<HttpResponse<UserDto>> {
    return this.http.get<HttpResponse<UserDto>>(`${this.apiUrl}/User/GetInfoUser`);
  }

}
