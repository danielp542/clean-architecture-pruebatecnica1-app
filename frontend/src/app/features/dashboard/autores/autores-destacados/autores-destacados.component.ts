import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Loan, LoansService } from '../../../../core/services/loans.service';

interface Author {
  id: number;
  name: string;
  bookCount?: number;
  borrowCount?: number;
}

@Component({
  selector: 'app-autores-destacados',
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './autores-destacados.component.html',
  styleUrl: './autores-destacados.component.scss'
})
export class AutoresDestacadosComponent implements OnInit {
  topAuthors: Author[] = [];
  loading: boolean = true;
  error: string | null = null;

  constructor(private loansService: LoansService) {}

  ngOnInit(): void {
    this.loadTopAuthors();
  }

  loadTopAuthors(): void {
    this.loading = true;
    this.error = null;
    
    this.loansService.getMyLoans().subscribe({
      next: (loans: Loan[]) => {
        // Simulamos datos de autores (deberías adaptar esto a tu estructura real)
        const authorsData = this.simulateAuthorsData();
        
        // Contar préstamos por autor
        const authorCountMap = new Map<number, { author: Author, count: number }>();
        
        loans.forEach(loan => {
          if (loan.book) {
            // En un caso real, aquí obtendrías el autor del libro
            // Como ejemplo, asignamos autores aleatorios de nuestra simulación
            const randomAuthor = authorsData[Math.floor(Math.random() * authorsData.length)];
            
            if (authorCountMap.has(randomAuthor.id)) {
              const existing = authorCountMap.get(randomAuthor.id)!;
              existing.count += 1;
            } else {
              authorCountMap.set(randomAuthor.id, { 
                author: { ...randomAuthor }, 
                count: 1 
              });
            }
          }
        });
        
        // Convertir a array y ordenar por cantidad de préstamos
        const authorsWithCount = Array.from(authorCountMap.values())
          .map(item => {
            return { ...item.author, borrowCount: item.count };
          })
          .sort((a, b) => (b.borrowCount || 0) - (a.borrowCount || 0))
          .slice(0, 3); // Tomar solo los 3 primeros
        
        this.topAuthors = authorsWithCount;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar los autores destacados';
        this.loading = false;
        console.error('Error loading authors:', err);
      }
    });
  }

  // Simulación de datos de autores (debes reemplazar esto con tu data real)
  private simulateAuthorsData(): Author[] {
    return [
      { id: 1, name: 'Gabriel García Márquez', bookCount: 15 },
      { id: 2, name: 'Isabel Allende', bookCount: 12 },
      { id: 3, name: 'Mario Vargas Llosa', bookCount: 18 },
      { id: 4, name: 'Jorge Luis Borges', bookCount: 10 },
      { id: 5, name: 'Pablo Neruda', bookCount: 8 },
      { id: 6, name: 'Julio Cortázar', bookCount: 9 },
      { id: 7, name: 'Carlos Fuentes', bookCount: 11 },
      { id: 8, name: 'Elena Poniatowska', bookCount: 7 }
    ];
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

  getBookCount(author: Author): number {
    return author.bookCount || 0;
  }

  getBorrowCount(author: Author): number {
    return author.borrowCount || 0;
  }
}