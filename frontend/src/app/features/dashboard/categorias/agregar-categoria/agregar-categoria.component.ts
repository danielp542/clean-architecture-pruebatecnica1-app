import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { GenresService } from '../../../../core/services/genres.service';
import { Genre } from '../../../../models/Genre';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-agregar-genero',
  templateUrl: './agregar-categoria.component.html',
  styleUrls: ['./agregar-categoria.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ]
})
export class AgregarCategoriaComponent implements OnInit, OnDestroy {
  genreForm: FormGroup;
  isEditMode = false;
  genreId: number | null = null;
  isLoading = false;
  private subscriptions: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private genresService: GenresService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.genreForm = this.createForm();
  }

  ngOnInit(): void {
    // Verificar si estamos en modo edición
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.genreId = +params['id'];
        this.loadGenreData(this.genreId);
      }
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  createForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      description: ['']
    });
  }

  loadGenreData(id: number): void {
    this.isLoading = true;
    this.subscriptions.add(
      this.genresService.getGenreById(id).subscribe({
        next: (genre: Genre) => {
          this.genreForm.patchValue({
            name: genre.name,
            description: genre.description || ''
          });
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading genre:', error);
          this.snackBar.open('Error al cargar el género', 'Cerrar', { duration: 3000 });
          this.isLoading = false;
        }
      })
    );
  }

  onSubmit(): void {
    if (this.genreForm.valid) {
      this.isLoading = true;
      const formValue = this.genreForm.value;

      if (this.isEditMode && this.genreId) {
        // Modo edición
        this.subscriptions.add(
          this.genresService.updateGenre(this.genreId, formValue).subscribe({
            next: (genre: Genre) => {
              this.snackBar.open('Género actualizado correctamente', 'Cerrar', { duration: 3000 });
              this.router.navigate(['/dashboard/generos/todos']);
            },
            error: (error) => {
              console.error('Error updating genre:', error);
              this.snackBar.open('Error al actualizar el género', 'Cerrar', { duration: 3000 });
              this.isLoading = false;
            }
          })
        );
      } else {
        // Modo creación
        this.subscriptions.add(
          this.genresService.createGenre(formValue).subscribe({
            next: (genre: Genre) => {
              this.snackBar.open('Género creado correctamente', 'Cerrar', { duration: 3000 });
              this.router.navigate(['/dashboard/generos/todos']);
            },
            error: (error) => {
              console.error('Error creating genre:', error);
              this.snackBar.open('Error al crear el género', 'Cerrar', { duration: 3000 });
              this.isLoading = false;
            }
          })
        );
      }
    } else {
      // Marcar todos los campos como tocados para mostrar errores
      this.markFormGroupTouched(this.genreForm);
    }
  }

  onCancel(): void {
    this.router.navigate(['/dashboard/generos/todos']);
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

  // Getters para acceder fácilmente a los controles del formulario
  get name() { return this.genreForm.get('name'); }
  get description() { return this.genreForm.get('description'); }
}