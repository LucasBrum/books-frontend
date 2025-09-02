import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthorService } from '../../../core/services/author.service';
import { Author, AuthorCreateRequest, AuthorUpdateRequest } from '../../../core/models';

@Component({
  selector: 'app-author-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './author-form.component.html',
  styleUrl: './author-form.component.scss'
})
export class AuthorFormComponent implements OnInit, OnDestroy {
  authorForm: FormGroup;
  loading = false;
  error: string | null = null;
  isEditMode = false;
  authorId?: number;
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private authorService: AuthorService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.authorForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(150)]]
    });
  }

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.authorId = +params['id'];
        this.loadAuthor();
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadAuthor(): void {
    if (this.authorId) {
      this.loading = true;
      this.authorService.getAuthor(this.authorId).subscribe({
        next: (author) => {
          this.authorForm.patchValue({
            name: author.name
          });
          this.loading = false;
        },
        error: (error) => {
          this.error = 'Erro ao carregar autor: ' + error.message;
          this.loading = false;
          console.error('Erro ao carregar autor:', error);
        }
      });
    }
  }

  onSubmit(): void {
    if (this.authorForm.valid) {
      this.loading = true;
      this.error = null;
      const formValue = this.authorForm.value;

      if (this.isEditMode && this.authorId) {
        const updateData: AuthorUpdateRequest = {
          name: formValue.name
        };
        this.authorService.updateAuthor(this.authorId, updateData).subscribe({
          next: () => {
            alert('Autor atualizado com sucesso!');
            this.router.navigate(['/authors']);
          },
          error: (error) => {
            this.error = 'Erro ao atualizar autor: ' + error.message;
            this.loading = false;
          }
        });
      } else {
        const createData: AuthorCreateRequest = {
          name: formValue.name
        };
        this.authorService.createAuthor(createData).subscribe({
          next: () => {
            alert('Autor criado com sucesso!');
            this.router.navigate(['/authors']);
          },
          error: (error) => {
            this.error = 'Erro ao criar autor: ' + error.message;
            this.loading = false;
          }
        });
      }
    }
  }

  onCancel(): void {
    this.router.navigate(['/authors']);
  }

  getErrorMessage(fieldName: string): string {
    const field = this.authorForm.get(fieldName);
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
