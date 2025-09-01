import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { LoansService, Loan } from '../../../../core/services/loans.service';
import { AuthService } from '../../../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { EditLoanModalComponent } from '../edit-loan-modal/edit-loan-modal.component';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-mis-prestamos',
  templateUrl: './mis-prestamos.component.html',
  styleUrls: ['./mis-prestamos.component.scss'],
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDividerModule
  ]
})
export class MisPrestamosComponent implements OnInit, OnDestroy {
  loans: Loan[] = [];
  isLoading = false;
  displayedColumns: string[] = ['book', 'loan_date', 'due_date', 'status', 'actions'];
  private subscriptions: Subscription = new Subscription();

  constructor(
    private loansService: LoansService,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadMyLoans();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  loadMyLoans(): void {
    this.subscriptions.add(
  this.loansService.getMyLoans().subscribe({
    next: (response: Loan[]) => {
      this.loans = response;
      this.isLoading = false;
    },
    error: (error) => {
      console.error('Error loading loans:', error);
      this.snackBar.open('Error al cargar los préstamos', 'Cerrar', { duration: 3000 });
      this.isLoading = false;
    }
  })
);

  }

  onReturnLoan(loan: Loan): void {
    if (confirm(`¿Estás seguro de que quieres devolver "${loan.book?.title}"?`)) {
      this.isLoading = true;
      this.subscriptions.add(
        this.loansService.returnLoan(loan.id).subscribe({
          next: (response) => {
            this.snackBar.open('Libro devuelto correctamente', 'Cerrar', { duration: 3000 });
            this.loadMyLoans(); // Recargar la lista
          },
          error: (error) => {
            console.error('Error returning loan:', error);
            this.snackBar.open('Error al devolver el libro', 'Cerrar', { duration: 3000 });
            this.isLoading = false;
          }
        })
      );
    }
  }

  onEditLoan(loan: Loan): void {
    const dialogRef = this.dialog.open(EditLoanModalComponent, {
      width: '400px',
      data: { 
        loanId: loan.id,
        currentDueDate: loan.due_date,
        bookTitle: loan.book?.title
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadMyLoans(); // Recargar si se editó
      }
    });
  }

  onNewLoan(): void {
    this.router.navigate(['/dashboard/prestamos/nuevo']);
  }

  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'activo':
        return 'status-active';
      case 'devuelto':
        return 'status-returned';
      case 'vencido':
        return 'status-overdue';
      default:
        return 'status-default';
    }
  }

  isLoanOverdue(loan: Loan): boolean {
    if (loan.status === 'devuelto') return false;
    
    const dueDate = new Date(loan.due_date);
    const today = new Date();
    return dueDate < today;
  }
}