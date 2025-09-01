import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { BooksService } from '../../../../core/services/books.service';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Book } from '../../../../models/book';

@Component({
  selector: 'app-todos-libros',
  templateUrl: './todos-libros.component.html',
  styleUrls: ['./todos-libros.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    FormsModule,      
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatDialogModule
  ],
})
export class TodosLibrosComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'title', 'isbn', 'published_year', 'available_copies', 'actions'];
  dataSource = new MatTableDataSource<Book>();
  loading = false;
  searchText = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private booksService: BooksService,
    private router: Router,
    private _liveAnnouncer: LiveAnnouncer,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadBooks(): void {
    this.loading = true;
    this.booksService.getAllBooks().subscribe({
      next: (response: Book[]) => {
        console.log('Books loaded:', response);
        this.dataSource.data = response;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading books:', error);
        this.snackBar.open('Error al cargar los libros', 'Cerrar', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
        this.loading = false;
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  searchBooks(): void {
    if (this.searchText.trim()) {
      this.loading = true;
      this.booksService.searchBooks(this.searchText).subscribe({
        next: (response: Book[]) => {
          this.dataSource.data = response;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error searching books:', error);
          this.snackBar.open('Error al buscar libros', 'Cerrar', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
          this.loading = false;
        }
      });
    } else {
      this.loadBooks();
    }
  }

  clearSearch(): void {
    this.searchText = '';
    this.loadBooks();
  }

  onPageChange(event: PageEvent): void {
    console.log('Page changed:', event);
  }

  onSortChange(sortState: Sort): void {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  viewBook(bookId: number): void {
    this.router.navigate(['dashboard/libros', bookId]);
  }

  editBook(bookId: number): void {
    this.router.navigate(['dashboard/libros/editar', bookId]);
  }

  deleteBook(bookId: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar este libro?')) {
      this.booksService.deleteBook(bookId).subscribe({
        next: () => {
          this.snackBar.open('Libro eliminado correctamente', 'Cerrar', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });
          this.loadBooks();
        },
        error: (error) => {
          console.error('Error deleting book:', error);
          this.snackBar.open('Error al eliminar el libro', 'Cerrar', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
        }
      });
    }
  }

  getAuthorsList(book: Book): string {
    return book.authors?.map(author => author.name).join(', ') || 'Sin autores';
  }

  getGenresList(book: Book): string {
    return book.genres?.map(genre => genre.name).join(', ') || 'Sin géneros';
  }
}