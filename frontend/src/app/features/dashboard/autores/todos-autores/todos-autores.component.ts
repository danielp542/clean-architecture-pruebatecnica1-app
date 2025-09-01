import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { AuthorsService } from '../../../../core/services/authors.service';
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
import { Author } from '../../../../models/Author';

@Component({
  selector: 'app-todos-autores',
  templateUrl: './todos-autores.component.html',
  styleUrls: ['./todos-autores.component.scss'],
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
export class TodosAutoresComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'nationality', 'birthdate', 'books_count', 'actions'];
  dataSource = new MatTableDataSource<Author>();
  loading = false;
  searchText = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private authorsService: AuthorsService,
    private router: Router,
    private _liveAnnouncer: LiveAnnouncer,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadAuthors();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadAuthors(): void {
    this.loading = true;
    this.authorsService.getAllAuthors().subscribe({
      next: (response: Author[]) => {
        console.log('Authors loaded:', response);
        this.dataSource.data = response;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading authors:', error);
        this.snackBar.open('Error al cargar los autores', 'Cerrar', {
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

  searchAuthors(): void {
    if (this.searchText.trim()) {
      this.loading = true;
      this.authorsService.searchAuthors(this.searchText).subscribe({
        next: (response: Author[]) => {
          this.dataSource.data = response;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error searching authors:', error);
          this.snackBar.open('Error al buscar autores', 'Cerrar', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
          this.loading = false;
        }
      });
    } else {
      this.loadAuthors();
    }
  }

  clearSearch(): void {
    this.searchText = '';
    this.loadAuthors();
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

  viewAuthor(authorId: number): void {
    this.router.navigate(['dashboard/autores', authorId]);
  }

  editAuthor(authorId: number): void {
    this.router.navigate(['dashboard/autores/editar', authorId]);
  }

  deleteAuthor(authorId: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar este autor?')) {
      this.authorsService.deleteAuthor(authorId).subscribe({
        next: () => {
          this.snackBar.open('Autor eliminado correctamente', 'Cerrar', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });
          this.loadAuthors();
        },
        error: (error) => {
          console.error('Error deleting author:', error);
          this.snackBar.open('Error al eliminar el autor', 'Cerrar', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
        }
      });
    }
  }

  getBooksCount(author: Author): number {
    return author.books?.length || 0;
  }

  formatDate(dateString?: string): string {
    if (!dateString) return 'N/A';
    
    const date = new Date(dateString);
    return date.toLocaleDateString();
  }
}