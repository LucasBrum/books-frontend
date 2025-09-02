import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { BookService } from '../../../core/services/book.service';
import { AuthorService } from '../../../core/services/author.service';
import { GenreService } from '../../../core/services/genre.service';
import { Book, BookCreateRequest, BookUpdateRequest, Author, Genre } from '../../../core/models';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.scss'
})
export class BookFormComponent implements OnInit, OnDestroy {
  bookForm: FormGroup;
  loading = false;
  error: string | null = null;
  authors: Author[] = [];
  genres: Genre[] = [];
  isEditMode = false;
  bookId?: number;
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private authorService: AuthorService,
    private genreService: GenreService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    const currentYear = new Date().getFullYear();
    
    this.bookForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(200)]],
      description: ['', [Validators.maxLength(500)]],
      isbn: ['', [Validators.maxLength(20)]],
      publishedDate: ['', [Validators.required]],
      authorId: ['', [Validators.required]],
      genreId: ['', [Validators.required]]
    });

    // Load data will be done in ngOnInit
  }

  ngOnInit(): void {
    // Load authors and genres for dropdowns
    this.loadAuthors();
    this.loadGenres();

    this.route.params.pipe(takeUntil(this.destroy$)).subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.bookId = +params['id'];
        this.loadBook();
      }
    });
  }

  loadAuthors(): void {
    this.authorService.getAllAuthors().subscribe({
      next: (response) => {
        this.authors = response.content;
      },
      error: (error) => {
        console.error('Erro ao carregar autores:', error);
      }
    });
  }

  loadGenres(): void {
    this.genreService.getAllGenres().subscribe({
      next: (response) => {
        this.genres = response.content;
      },
      error: (error) => {
        console.error('Erro ao carregar gêneros:', error);
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadBook(): void {
    if (this.bookId) {
      this.bookService.getBook(this.bookId).subscribe({
        next: (book) => {
          this.bookForm.patchValue({
            title: book.title,
            description: book.description || '',
            isbn: book.isbn || '',
            publishedDate: book.publishedDate || '',
            authorId: book.authorId,
            genreId: book.genreId
          });
        },
        error: (error) => {
          this.error = 'Erro ao carregar livro: ' + error.message;
          console.error('Erro ao carregar livro:', error);
        }
      });
    }
  }

  onSubmit(): void {
    if (this.bookForm.valid) {
      this.loading = true;
      this.error = null;
      const formValue = this.bookForm.value;

      if (this.isEditMode && this.bookId) {
        const updateData: BookUpdateRequest = {
          title: formValue.title,
          description: formValue.description,
          isbn: formValue.isbn,
          publishedDate: formValue.publishedDate,
          authorId: +formValue.authorId,
          genreId: +formValue.genreId
        };
        
        this.bookService.updateBook(this.bookId, updateData).subscribe({
          next: () => {
            alert('Livro atualizado com sucesso!');
            this.router.navigate(['/books']);
          },
          error: (error) => {
            this.error = 'Erro ao atualizar livro: ' + error.message;
            this.loading = false;
            console.error('Erro ao atualizar livro:', error);
          }
        });
      } else {
        const createData: BookCreateRequest = {
          title: formValue.title,
          description: formValue.description,
          isbn: formValue.isbn,
          publishedDate: formValue.publishedDate,
          authorId: +formValue.authorId,
          genreId: +formValue.genreId
        };
        
        this.bookService.createBook(createData).subscribe({
          next: () => {
            alert('Livro criado com sucesso!');
            this.router.navigate(['/books']);
          },
          error: (error) => {
            this.error = 'Erro ao criar livro: ' + error.message;
            this.loading = false;
            console.error('Erro ao criar livro:', error);
          }
        });
      }
    }
  }

  onCancel(): void {
    this.router.navigate(['/books']);
  }

  getErrorMessage(fieldName: string): string {
    const field = this.bookForm.get(fieldName);
    if (field?.errors) {
      if (field.errors['required']) {
        return `${this.getFieldLabel(fieldName)} é obrigatório`;
      }
      if (field.errors['maxlength']) {
        return `${this.getFieldLabel(fieldName)} deve ter no máximo ${field.errors['maxlength'].requiredLength} caracteres`;
      }
      if (field.errors['min']) {
        return `${this.getFieldLabel(fieldName)} deve ser maior que ${field.errors['min'].min}`;
      }
      if (field.errors['max']) {
        return `${this.getFieldLabel(fieldName)} deve ser menor que ${field.errors['max'].max}`;
      }
    }
    return '';
  }

  private getFieldLabel(fieldName: string): string {
    const labels: { [key: string]: string } = {
      title: 'Título',
      description: 'Descrição',
      isbn: 'ISBN',
      publishedDate: 'Data de Publicação',
      authorId: 'Autor',
      genreId: 'Gênero'
    };
    return labels[fieldName] || fieldName;
  }
}
