
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { AuthorsService } from '../../../../core/services/authors.service';
import { Author } from '../../../../models/Author';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-autor-form',
  templateUrl: './agregar-autor.component.html',
  styleUrl: './agregar-autor.component.scss',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class AgregarAutorComponent  implements OnInit, OnDestroy {
  authorForm: FormGroup;
  isEditMode = false;
  authorId: number | null = null;
  isLoading = false;
  private subscriptions: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private authorsService: AuthorsService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.authorForm = this.createForm();
  }

  ngOnInit(): void {
    // Verificar si estamos en modo edición
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.authorId = +params['id'];
        this.loadAuthorData(this.authorId);
      }
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  createForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      bio: ['', [Validators.required, Validators.minLength(10)]],
      birth_date: ['', Validators.required],
      nationality: ['']
    });
  }

  loadAuthorData(id: number): void {
    this.isLoading = true;
    this.subscriptions.add(
      this.authorsService.getAuthorById(id).subscribe({
        next: (author: Author) => {
          this.authorForm.patchValue({
            name: author.name,
            bio: author.bio || '',
            birth_date: author.birthdate ? new Date(author.birthdate) : '',
            nationality: author.nationality || ''
          });
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading author:', error);
          this.snackBar.open('Error al cargar el autor', 'Cerrar', { duration: 3000 });
          this.isLoading = false;
        }
      })
    );
  }

  onSubmit(): void {
    if (this.authorForm.valid) {
      this.isLoading = true;
      const formValue = this.authorForm.value;

      // Formatear la fecha para la API
      const authorData = {
        name: formValue.name,
        bio: formValue.bio,
        birth_date: formValue.birth_date ? this.formatDate(formValue.birth_date) : null,
        nationality: formValue.nationality
      };

      if (this.isEditMode && this.authorId) {
        // Modo edición
        this.subscriptions.add(
          this.authorsService.updateAuthor(this.authorId, authorData).subscribe({
            next: (author: Author) => {
              this.snackBar.open('Autor actualizado correctamente', 'Cerrar', { duration: 3000 });
              this.router.navigate(['/dashboard/autores/todos']);
            },
            error: (error) => {
              console.error('Error updating author:', error);
              this.snackBar.open('Error al actualizar el autor', 'Cerrar', { duration: 3000 });
              this.isLoading = false;
            }
          })
        );
      } else {
        // Modo creación
        this.subscriptions.add(
          this.authorsService.createAuthor(authorData).subscribe({
            next: (author: Author) => {
              this.snackBar.open('Autor creado correctamente', 'Cerrar', { duration: 3000 });
              this.router.navigate(['/dashboard/autores/todos']);
            },
            error: (error) => {
              console.error('Error creating author:', error);
              this.snackBar.open('Error al crear el autor', 'Cerrar', { duration: 3000 });
              this.isLoading = false;
            }
          })
        );
      }
    } else {
      
      this.markFormGroupTouched(this.authorForm);
    }
  }

  onCancel(): void {
    this.router.navigate(['/dashboard/autores/todos']);
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

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

  get name() { return this.authorForm.get('name'); }
  get bio() { return this.authorForm.get('bio'); }
  get birth_date() { return this.authorForm.get('birth_date'); }
  get nationality() { return this.authorForm.get('nationality'); }
}
