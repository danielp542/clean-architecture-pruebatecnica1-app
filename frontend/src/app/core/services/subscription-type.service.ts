import { Injectable } from '@angular/core';
import {BaseService} from './base.service';
import {HttpClient} from '@angular/common/http';
import {HttpResponse} from '../../models/http-response';
import {Observable} from 'rxjs';
import {SubscriptionTypeDto} from '../../models/subscription-type-dto';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionTypeService extends BaseService{

  constructor(protected override http: HttpClient) {
    super(http);
  }

  getSubscriptionTypes(): Observable<HttpResponse<SubscriptionTypeDto[]>> {
    return this.http.get<HttpResponse<SubscriptionTypeDto[]>>(`${this.apiUrl}/SubscriptionType/GetSubscriptionType`);
  }


}
