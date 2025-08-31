import {Injectable, Injector} from '@angular/core';
import {BaseService} from './base.service';
import {HttpClient} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {AcademyDto} from '../../models/academy-dto';
import {HttpResponse} from '../../models/http-response';
import {UserDto} from '../../models/user-dto';

@Injectable({
  providedIn: 'root'
})
export class AcademyService extends BaseService{

  constructor(protected override http: HttpClient) {
    super(http);
  }

  getAcademy(): void {
    this.http.get<HttpResponse<AcademyDto>>(`${this.apiUrl}/Academy/GetAcademy`).pipe(
      tap(response => {
        if (response) {
          sessionStorage.setItem('academy', JSON.stringify(response.data));
        } else {
          console.warn('No data received');
        }
      })
    ).subscribe();

    console.log('AcademyService getAcademy');
  }



}
