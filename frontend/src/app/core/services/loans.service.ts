import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class LoansService extends BaseService {
  constructor(protected override http: HttpClient) {
    super(http);
  }

  getAllLoans(): Observable<any> {
    return this.get('loans');
  }

  getLoanById(id: number): Observable<any> {
    return this.get(`loans/${id}`);
  }

  getUserLoans(userId: number): Observable<any> {
    return this.get(`loans/user/${userId}`);
  }

  getOverdueLoans(): Observable<any> {
    return this.get('loans/overdue/loans');
  }

  createLoan(loan: any): Observable<any> {
    return this.post('loans', loan);
  }

  returnLoan(loanId: number): Observable<any> {
    return this.post(`loans/return/${loanId}`, {});
  }
}