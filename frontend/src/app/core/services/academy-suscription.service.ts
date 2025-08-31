import { Injectable } from '@angular/core';
import {BaseService} from './base.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {HttpResponse} from '../../models/http-response';
import {SubscriptionDto} from '../../models/subscription-dto';

@Injectable({
  providedIn: 'root'
})
export class AcademySuscriptionService extends BaseService {

  constructor(protected override http: HttpClient) {
    super(http);
  }

  purchaseMembership(request: SubscriptionDto): Observable<HttpResponse<boolean>> {
    return this.http.post<HttpResponse<boolean>>(`${this.apiUrl}/AcademySuscription/PurchaseMembership`, request);
  }

}
