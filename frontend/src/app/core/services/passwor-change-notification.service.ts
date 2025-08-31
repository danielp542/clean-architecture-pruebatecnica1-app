import { Injectable } from '@angular/core';
import {BaseService} from './base.service';
import { Observable } from 'rxjs';
import {HttpResponse} from '../../models/http-response';
import {HttpClient} from '@angular/common/http';
import {PassworNotificationDto} from '../../models/passwor-notification-dto';

@Injectable({
  providedIn: 'root'
})
export class ChangeNotificationService extends BaseService {
  constructor(protected override http: HttpClient) {
    super(http);
  }
  notification(mailUser:{mailUser: string;}): Observable<HttpResponse<PassworNotificationDto>>{
    return this.http.post<HttpResponse<PassworNotificationDto>>(`${this.apiUrl}/User/passwordChangeNotification`, mailUser);
  }
}
