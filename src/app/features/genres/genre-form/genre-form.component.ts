import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { GenreService } from '../../../core/services/genre.service';
import { Genre, GenreCreateRequest, GenreUpdateRequest } from '../../../core/models';

@Component({
  selector: 'app-genre-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './genre-form.component.html',
  styleUrl: './genre-form.component.scss'
})
export class GenreFormComponent implements OnInit, OnDestroy {
  genreForm: FormGroup;
  loading = false;
  error: string | null = null;
  isEditMode = false;
  genreId?: number;
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private genreService: GenreService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.genreForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]]
    });
  }

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.genreId = +params['id'];
        this.loadGenre();
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadGenre(): void {
    if (this.genreId) {
      this.loading = true;
      this.genreService.getGenre(this.genreId).subscribe({
        next: (genre) => {
          this.genreForm.patchValue({
            name: genre.name
          });
          this.loading = false;
        },
        error: (error) => {
          this.error = 'Erro ao carregar gênero: ' + error.message;
          this.loading = false;
          console.error('Erro ao carregar gênero:', error);
        }
      });
    }
  }

  onSubmit(): void {
    if (this.genreForm.valid) {
      this.loading = true;
      this.error = null;
      const formValue = this.genreForm.value;

      if (this.isEditMode && this.genreId) {
        const updateData: GenreUpdateRequest = {
          name: formValue.name
        };
        this.genreService.updateGenre(this.genreId, updateData).subscribe({
          next: () => {
            alert('Gênero atualizado com sucesso!');
            this.router.navigate(['/genres']);
          },
          error: (error) => {
            this.error = 'Erro ao atualizar gênero: ' + error.message;
            this.loading = false;
          }
        });
      } else {
        const createData: GenreCreateRequest = {
          name: formValue.name
        };
        this.genreService.createGenre(createData).subscribe({
          next: () => {
            alert('Gênero criado com sucesso!');
            this.router.navigate(['/genres']);
          },
          error: (error) => {
            this.error = 'Erro ao criar gênero: ' + error.message;
            this.loading = false;
          }
        });
      }
    }
  }

  onCancel(): void {
    this.router.navigate(['/genres']);
  }

  getErrorMessage(fieldName: string): string {
    const field = this.genreForm.get(fieldName);
    if (field?.errors) {
      if (field.errors['required']) {
        return `${fieldName} é obrigatório`;
      }
      if (field.errors['maxlength']) {
        return `${fieldName} deve ter no máximo ${field.errors['maxlength'].requiredLength} caracteres`;
      }
    }
    return '';
  }
}
