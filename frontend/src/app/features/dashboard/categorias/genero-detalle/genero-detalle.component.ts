import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { GenresService } from '../../../../core/services/genres.service';
import { Genre } from '../../../../models/Genre';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule, Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-genero-detalle',
  templateUrl: './genero-detalle.component.html',
  styleUrls: ['./genero-detalle.component.scss'],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatDialogModule,
    MatDividerModule,
    MatChipsModule,
    MatTooltipModule,
    MatListModule
  ],
})
export class GeneroDetalleComponent implements OnInit {
  genre: Genre | null = null;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private genresService: GenresService,
    private snackBar: MatSnackBar,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.loadGenre();
  }

  loadGenre(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loading = true;
      this.genresService.getGenreById(+id).subscribe({
        next: (response: Genre) => {
          this.genre = response;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading genre:', error);
          this.snackBar.open('Error al cargar el género', 'Cerrar', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
          this.loading = false;
        }
      });
    }
  }

  goBack(): void {
    this.location.back();
  }

  editGenre(): void {
    if (this.genre?.id) {
      this.router.navigate(['/dashboard/categorias/editar', this.genre.id]);
    }
  }

  // AÑADE ESTE MÉTODO PARA RESOLVER EL ERROR
  viewBook(bookId: number): void {
    this.router.navigate(['/dashboard/libros', bookId]);
  }

  getBooksCount(): number {
    return this.genre?.books?.length || 0;
  }

  hasBooks(): boolean {
    return this.getBooksCount() > 0;
  }

  formatDate(dateString?: string): string {
    if (!dateString) return 'N/A';
    
    const date = new Date(dateString);
    return date.toLocaleDateString();
  }
}