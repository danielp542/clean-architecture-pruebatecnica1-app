  import { Component, OnInit, OnDestroy } from '@angular/core';
  import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
  import { ActivatedRoute, Router } from '@angular/router';
  import { MatSnackBar } from '@angular/material/snack-bar';
  import { Subscription, forkJoin } from 'rxjs';
  import { BooksService } from '../../../../core/services/books.service';
  import { AuthorsService } from '../../../../core/services/authors.service';
  import { Author } from '../../../../models/Author';
  import { Genre } from '../../../../models/Genre';
  import { Book } from '../../../../models/book';
  import { GenresService } from '../../../../core/services/genres.service';
  import { CreateBookRequest } from '../../../../models/CreateBookRequest';
  import { UpdateBookRequest } from '../../../../models/UpdateBookRequest';
  import { MatCardModule } from '@angular/material/card';
  import { MatFormFieldModule } from '@angular/material/form-field';
  import { MatInputModule } from '@angular/material/input';
  import { MatSelectModule } from '@angular/material/select';
  import { MatButtonModule } from '@angular/material/button';
  import { MatSnackBarModule } from '@angular/material/snack-bar';
  import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
  import { CommonModule } from '@angular/common';
  import { ReactiveFormsModule } from '@angular/forms';

  @Component({
    selector: 'app-agregar-libro',
    templateUrl: './agregar-libro.component.html',
    styleUrl: './agregar-libro.component.scss',
    imports: [
      CommonModule,
      ReactiveFormsModule,
      MatCardModule,
      MatFormFieldModule,
      MatInputModule,
      MatSelectModule,
      MatButtonModule,
      MatSnackBarModule,
      MatProgressSpinnerModule
    ]
  })
  
  export class AgregarLibroComponent implements OnInit, OnDestroy {
    bookForm: FormGroup;
    isEditMode = false;
    bookId: number | null = null;
    authors: Author[] = [];
    genres: Genre[] = [];
    isLoading = false;
    private subscriptions: Subscription = new Subscription();

    constructor(
      private fb: FormBuilder,
      private booksService: BooksService,
      private authorsService: AuthorsService,
      private genresService: GenresService,
      private route: ActivatedRoute,
      private router: Router,
      private snackBar: MatSnackBar
    ) {
      this.bookForm = this.createForm();
    }
    

    ngOnInit(): void {
      this.loadData();
      
      this.route.params.subscribe(params => {
        if (params['id']) {
          this.isEditMode = true;
          this.bookId = +params['id'];
          this.loadBookData(this.bookId);
        }
      });
    }

    ngOnDestroy(): void {
      this.subscriptions.unsubscribe();
    }

    createForm(): FormGroup {
      return this.fb.group({
        title: ['', [Validators.required, Validators.minLength(2)]],
        isbn: ['', [Validators.required, Validators.pattern(/^\d{10,13}$/)]],
        published_year: ['', [Validators.required, Validators.min(1000), Validators.max(new Date().getFullYear())]],
        available_copies: [1, [Validators.required, Validators.min(0)]],
        author_ids: [[], Validators.required],
        genre_ids: [[], Validators.required]
      });
    }

    loadData(): void {
      this.isLoading = true;
      
      const authors$ = this.authorsService.getAllAuthors();
      const genres$ = this.genresService.getAllGenres();
      
      this.subscriptions.add(
        forkJoin([authors$, genres$]).subscribe({
          next: ([authors, genres]) => {
            this.authors = authors;
            this.genres = genres;
            this.isLoading = false;
          },
          error: (error) => {
            console.error('Error loading data:', error);
            this.snackBar.open('Error al cargar los datos', 'Cerrar', { duration: 3000 });
            this.isLoading = false;
          }
        })
      );
    }

    loadBookData(id: number): void {
      this.isLoading = true;
      this.subscriptions.add(
        this.booksService.getBookById(id).subscribe({
          next: (book: Book) => {
            
            this.bookForm.patchValue({
              id: book.id,
              title: book.title,
              isbn: book.isbn,
              published_year: book.published_year,
              available_copies: book.available_copies,
              author_ids: book.authors?.map(a => a.id) || [],
              genre_ids: book.genres?.map(g => g.id) || []
            });
            this.isLoading = false;
          },
          error: (error) => {
            console.error('Error loading book:', error);
            this.snackBar.open('Error al cargar el libro', 'Cerrar', { duration: 3000 });
            this.isLoading = false;
          }
        })
      );
    }

    onSubmit(): void {
      if (this.bookForm.valid) {
        this.isLoading = true;
        const formValue = this.bookForm.value;

        if (this.isEditMode && this.bookId) {
          // Modo edición - Asegúrate de incluir el ID
          const updateRequest: UpdateBookRequest = {
            id: this.bookId, // ← ESTA ES LA LÍNEA CRÍTICA QUE FALTA
            title: formValue.title,
            isbn: formValue.isbn,
            published_year: formValue.published_year,
            available_copies: formValue.available_copies,
            author_ids: formValue.author_ids,
            genre_ids: formValue.genre_ids
          };

          this.subscriptions.add(
            this.booksService.createBook( updateRequest).subscribe({
              next: (book: Book) => {
                this.snackBar.open('Libro actualizado correctamente', 'Cerrar', { duration: 3000 });
                this.router.navigate(['/libros']);
              },
              error: (error) => {
                console.error('Error updating book:', error);
                this.snackBar.open('Error al actualizar el libro', 'Cerrar', { duration: 3000 });
                this.isLoading = false;
              }
            })
          );
        } else {
          const createRequest: CreateBookRequest = {
            title: formValue.title,
            isbn: formValue.isbn,
            published_year: formValue.published_year,
            available_copies: formValue.available_copies,
            author_ids: formValue.author_ids,
            genre_ids: formValue.genre_ids
          };

          this.subscriptions.add(
            this.booksService.createBook(createRequest).subscribe({
              next: (book: Book) => {
                this.snackBar.open('Libro creado correctamente', 'Cerrar', { duration: 3000 });
                this.router.navigate(['/dashboard/libros/todos']);
              },
              error: (error) => {
                console.error('Error creating book:', error);
                this.snackBar.open('Error al crear el libro', 'Cerrar', { duration: 3000 });
                this.isLoading = false;
              }
            })
          );
        }
      } else {
        this.markFormGroupTouched(this.bookForm);
      }
    }

    onCancel(): void {
      this.router.navigate(['/dashboard/libros/todos']);
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

    get title() { return this.bookForm.get('title'); }
    get isbn() { return this.bookForm.get('isbn'); }
    get published_year() { return this.bookForm.get('published_year'); }
    get available_copies() { return this.bookForm.get('available_copies'); }
    get author_ids() { return this.bookForm.get('author_ids'); }
    get genre_ids() { return this.bookForm.get('genre_ids'); }
  }