import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Loan, LoansService } from '../../../../core/services/loans.service';

interface Book {
  id: number;
  title: string;
  isbn: string;
  published_year?: number;
  copies_total?: number;
  copies_available?: number;
  borrowCount?: number;
}

@Component({
  selector: 'app-libros-populares',
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './libros-populares.component.html',
  styleUrl: './libros-populares.component.scss'
})
export class LibrosPopularesComponent implements OnInit {
  topBooks: Book[] = [];
  loading: boolean = true;
  error: string | null = null;

  constructor(private loansService: LoansService) {}

  ngOnInit(): void {
    this.loadMostBorrowedBooks();
  }

  loadMostBorrowedBooks(): void {
    this.loading = true;
    this.error = null;
    
    this.loansService.getMyLoans().subscribe({
      next: (loans: Loan[]) => {
        // Contar préstamos por libro
        const bookCountMap = new Map<number, { book: Book, count: number }>();
        
        loans.forEach(loan => {
          if (loan.book) {
            if (bookCountMap.has(loan.book.id)) {
              const existing = bookCountMap.get(loan.book.id)!;
              existing.count += 1;
            } else {
              bookCountMap.set(loan.book.id, { 
                book: { 
                  id: loan.book.id,
                  title: loan.book.title,
                  isbn: loan.book.isbn,
                  borrowCount: 1
                }, 
                count: 1 
              });
            }
          }
        });
        
        // Convertir a array y ordenar por cantidad de préstamos
        const booksWithCount = Array.from(bookCountMap.values())
          .map(item => {
            return { ...item.book, borrowCount: item.count };
          })
          .sort((a, b) => (b.borrowCount || 0) - (a.borrowCount || 0))
          .slice(0, 3); // Tomar solo los 3 primeros
        
        this.topBooks = booksWithCount;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar los libros más prestados';
        this.loading = false;
        console.error('Error loading loans:', err);
      }
    });
  }

  getPositionClass(index: number): string {
    switch(index) {
      case 0: return 'first-place';
      case 1: return 'second-place';
      case 2: return 'third-place';
      default: return '';
    }
  }

  getMedalIcon(index: number): string {
    switch(index) {
      case 0: return '🥇';
      case 1: return '🥈';
      case 2: return '🥉';
      default: return (index + 1).toString();
    }
  }

  getAuthors(book: Book): string {
    // Si necesitas obtener autores, deberías ajustar la interfaz Loan
    return 'Autor no disponible';
  }

  getBorrowCount(book: Book): number {
    return book.borrowCount || 0;
  }
}