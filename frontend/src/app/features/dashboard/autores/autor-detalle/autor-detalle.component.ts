import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthorsService } from '../../../../core/services/authors.service';
import { Author } from '../../../../models/Author';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule, Location, DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-autor-detalle',
  templateUrl: './autor-detalle.component.html',
  styleUrls: ['./autor-detalle.component.scss'],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatDividerModule,
    MatChipsModule,
    MatTooltipModule,
    DatePipe
  ]
})
export class AutorDetalleComponent implements OnInit {
  author: Author | null = null;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authorsService: AuthorsService,
    private snackBar: MatSnackBar,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.loadAuthor();
  }

  loadAuthor(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loading = true;
      this.authorsService.getAuthorById(+id).subscribe({
        next: (response: Author) => {
          this.author = response;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading author:', error);
          this.snackBar.open('Error al cargar el autor', 'Cerrar', {
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

  editAuthor(): void {
    if (this.author?.id) {
      this.router.navigate(['/dashboard/autores/editar', this.author.id]);
    }
  }

  getBooksCount(): number {
    return this.author?.books?.length || 0;
  }

  getAge(): number | null {
    if (!this.author?.birthdate) return null;
    
    const birthDate = new Date(this.author.birthdate);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    
    // Ajustar si aún no ha pasado el cumpleaños este año
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}