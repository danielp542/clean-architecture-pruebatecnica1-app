import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { LoansService } from '../../../../core/services/loans.service';
import { BooksService } from '../../../../core/services/books.service';
import { Book } from '../../../../models/book';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../../core/services/auth.service';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-nuevo-prestamo',
  templateUrl: './nuevo-prestamo.component.html',
  styleUrls: ['./nuevo-prestamo.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatListModule
  ],
})
export class NuevoPrestamoComponent implements OnInit, OnDestroy {
  loanForm: FormGroup;
  books: Book[] = [];
  isLoading = false;
  minDate: Date;
  maxDate: Date;
  private subscriptions: Subscription = new Subscription();
  
  // Hacer públicas estas propiedades para que estén accesibles en el template
  currentUserId: number;
  currentUserName: string;

  constructor(
    private fb: FormBuilder,
    private loansService: LoansService,
    private booksService: BooksService,
    public authService: AuthService, // Cambiado a public para acceso en template
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    // Obtener el ID del usuario logueado
    const user = this.authService.getCurrentUser();
    this.currentUserId = user?.id || 0;
    this.currentUserName = user?.name || 'Usuario';

    // Configurar fechas mínima y máxima
    this.minDate = new Date();
    this.maxDate = new Date();
    this.maxDate.setDate(this.maxDate.getDate() + 15); // Máximo 15 días

    this.loanForm = this.createForm();
  }

  ngOnInit(): void {
    this.loadAvailableBooks();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  createForm(): FormGroup {
    return this.fb.group({
      book_id: ['', [Validators.required]],
      due_date: ['', [Validators.required]]
    });
  }

  loadAvailableBooks(): void {
  this.isLoading = true;
  this.subscriptions.add(
    this.booksService.getAllBooks().subscribe({
      next: (response: Book[]) => {
        console.log('Libros recibidos:', response);
        
        // Usa available_copies en lugar de copies_available
        this.books = response.filter(book => (book.available_copies || 0) > 0);
        
        console.log('Libros disponibles:', this.books);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading books:', error);
        this.snackBar.open('Error al cargar los libros disponibles', 'Cerrar', { duration: 3000 });
        this.isLoading = false;
      }
    })
  );
}

  onSubmit(): void {
    if (this.loanForm.valid && this.currentUserId > 0) {
      this.isLoading = true;
      
      const formValue = this.loanForm.value;
      const loanData = {
        user_id: this.currentUserId, // Usar el ID del usuario logueado
        book_id: formValue.book_id,
        due_date: this.formatDate(formValue.due_date)
      };

      this.subscriptions.add(
        this.loansService.createLoan(loanData).subscribe({
          next: (response: any) => {
            this.snackBar.open('Préstamo creado correctamente', 'Cerrar', { duration: 3000 });
            this.router.navigate(['/dashboard/prestamos/mis-prestamos']);
          },
          error: (error) => {
            console.error('Error creating loan:', error);
            
            let errorMessage = 'Error al crear el préstamo';
            if (error.status === 400) {
              if (error.error?.message?.includes('Máximo 3 préstamos activos')) {
                errorMessage = 'Ya tienes el máximo de 3 préstamos activos';
              } else if (error.error?.message?.includes('Máximo 15 días')) {
                errorMessage = 'El período máximo de préstamo es de 15 días';
              } else if (error.error?.message?.includes('no disponible')) {
                errorMessage = 'El libro no está disponible';
              }
            } else if (error.status === 404) {
              errorMessage = 'Libro o usuario no encontrado';
            }
            
            this.snackBar.open(errorMessage, 'Cerrar', { duration: 5000 });
            this.isLoading = false;
          }
        })
      );
    } else {
      this.markFormGroupTouched(this.loanForm);
    }
  }

  onCancel(): void {
    this.router.navigate(['/dashboard/prestamos/mis-prestamos']);
  }

  // Método para formatear la fecha en formato YYYY-MM-DD
  private formatDate(date: Date): string {
    if (!date) return '';
    
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  }

  // Método auxiliar para marcar todos los campos como tocados
  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      } else {
        control?.markAsTouched();
      }
    });
  }
  getAuthorsNames(authors: any[]): string {
    if (!authors || authors.length === 0) return 'Autor desconocido';
    return authors.map(author => author.name).join(', ');
  }

  // Getters para acceder fácilmente a los controles del formulario
  get book_id() { return this.loanForm.get('book_id'); }
  get due_date() { return this.loanForm.get('due_date'); }
}