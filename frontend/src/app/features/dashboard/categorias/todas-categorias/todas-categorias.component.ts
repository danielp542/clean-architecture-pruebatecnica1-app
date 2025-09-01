import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { GenresService } from '../../../../core/services/genres.service';
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
import { MatTooltipModule } from '@angular/material/tooltip'; // Añade esta importación
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Genre } from '../../../../models/Genre';

@Component({
  selector: 'app-todas-categorias',
  templateUrl: './todas-categorias.component.html',
  styleUrls: ['./todas-categorias.component.scss'],
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
    MatDialogModule,
    MatTooltipModule // Añade esta importación
  ],
})
export class TodasCategoriasComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'description', 'books_count', 'actions'];
  dataSource = new MatTableDataSource<Genre>();
  loading = false;
  searchText = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private genresService: GenresService,
    private router: Router,
    private _liveAnnouncer: LiveAnnouncer,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadGenres();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadGenres(): void {
    this.loading = true;
    this.genresService.getAllGenres().subscribe({
      next: (response: Genre[]) => {
        console.log('Genres loaded:', response);
        this.dataSource.data = response;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading genres:', error);
        this.snackBar.open('Error al cargar los géneros', 'Cerrar', {
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

  searchGenres(): void {
    if (this.searchText.trim()) {
      this.loading = true;
      // Si tienes un método de búsqueda en el servicio, úsalo aquí
      // this.genresService.searchGenres(this.searchText).subscribe({...});
      // Por ahora, filtramos localmente
      const filteredData = this.dataSource.data.filter(genre => 
        genre.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
        (genre.description && genre.description.toLowerCase().includes(this.searchText.toLowerCase()))
      );
      this.dataSource.data = filteredData;
      this.loading = false;
    } else {
      this.loadGenres();
    }
  }

  clearSearch(): void {
    this.searchText = '';
    this.loadGenres();
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

  viewGenre(genreId: number): void {
    this.router.navigate(['dashboard/generos', genreId]);
  }

  editGenre(genreId: number): void {
    this.router.navigate(['dashboard/generos/editar', genreId]);
  }

  deleteGenre(genreId: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar este género?')) {
      // Si tienes un método delete en el servicio, úsalo aquí
      // this.genresService.deleteGenre(genreId).subscribe({...});
      this.snackBar.open('Función de eliminar no implementada', 'Cerrar', {
        duration: 3000,
      });
      // Por ahora, solo recargamos los datos
      this.loadGenres();
    }
  }

  getBooksCount(genre: Genre): number {
    return genre.books?.length || 0;
  }

  truncateDescription(description: string | undefined, maxLength: number = 50): string {
    if (!description) return 'Sin descripción';
    if (description.length <= maxLength) return description;
    return description.substring(0, maxLength) + '...';
  }
}