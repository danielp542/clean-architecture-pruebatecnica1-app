import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { map } from 'rxjs/operators';

export interface Loan {
  id: number;
  user_id: number;
  book_id: number;
  loan_date: string;
  due_date: string;
  return_date: string | null;
  status: 'activo' | 'devuelto' | 'vencido';
  book?: {
    id: number;
    title: string;
    isbn: string;
  };
  user?: {
    id: number;
    name: string;
    email: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class LoansService extends BaseService {
  constructor(protected override http: HttpClient) {
    super(http);
  }

  // Obtener préstamos del usuario actual
  getMyLoans(): Observable<Loan[]> {
  const currentUser = sessionStorage.getItem('currentUser');
  let userId = null;

  if (currentUser) {
    try {
      userId = JSON.parse(currentUser).id;
    } catch (e) {
      console.error('Error parsing currentUser from sessionStorage', e);
    }
  }

  return this.http.get<{ data: any[] }>(`${this.apiUrl}/loans/user/${userId}`)
    .pipe(
      map(response =>
        response.data.map(item => ({
          ...item,
          status: item.status?.name || 'activo' // 👈 normalizamos
        }))
      )
    );
}

  // Devolver un préstamo
  // Devolver un préstamo
returnLoan(loanId: number): Observable<any> {
  return this.http.post(`${this.apiUrl}/loans/return/${loanId}`, {});
}


  // Editar fecha de devolución
  updateLoanDueDate(loanId: number, dueDate: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/loans/${loanId}`, { due_date: dueDate });
  }

  createLoan(data: any): Observable<any> {
    return this.post('loans', data);
  }
}