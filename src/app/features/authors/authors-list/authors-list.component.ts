import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthorService } from '../../../core/services/author.service';
import { Author, PagedResponse } from '../../../core/models';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-authors-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  templateUrl: './authors-list.component.html',
  styleUrl: './authors-list.component.scss'
})
export class AuthorsListComponent implements OnInit {
  authors: Author[] = [];
  loading = false;
  error: string | null = null;
  pagination: any = null;
  
  // Search and filters
  searchTerm = '';
  currentPage = 0;
  pageSize = 10;
  private searchSubject = new Subject<string>();

  constructor(private authorService: AuthorService) {
    // Setup search debounce
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(searchTerm => {
      this.currentPage = 0;
      this.loadAuthors();
    });
  }

  ngOnInit(): void {
    console.log('🔍 ngOnInit - Iniciando componente de autores');
    this.loadAuthors();
  }

  loadAuthors(): void {
    console.log('👥 loadAuthors - Iniciando carregamento de autores');
    this.loading = true;
    this.error = null;
    
    // Preparar parâmetros de busca
    const params: any = {
      page: this.currentPage,
      size: this.pageSize
    };
    
    if (this.searchTerm.trim()) {
      params.name = this.searchTerm.trim();
    }
    
    console.log('🔍 loadAuthors - Parâmetros:', params);
    
    this.authorService.getAuthors(params).subscribe({
      next: (response: PagedResponse<Author>) => {
        console.log('✅ loadAuthors - Resposta da API:', response);
        this.authors = response.content;
        this.pagination = {
          totalElements: response.totalElements,
          totalPages: response.totalPages,
          size: response.size,
          number: response.number,
          first: response.first,
          last: response.last
        };
        this.loading = false;
      },
      error: (error) => {
        console.error('❌ loadAuthors - Erro na API:', error);
        this.error = 'Erro ao carregar autores. Tente novamente.';
        this.loading = false;
      }
    });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadAuthors();
  }

  onSearchChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchTerm = target.value;
    this.searchSubject.next(target.value);
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.currentPage = 0;
    this.loadAuthors();
  }

  onPageSizeChange(size: number): void {
    this.pageSize = size;
    this.currentPage = 0;
    this.loadAuthors();
  }

  deleteAuthor(author: Author): void {
    if (confirm(`Tem certeza que deseja excluir o autor "${author.name}"? Esta ação não pode ser desfeita.`)) {
      this.loading = true;
      
      this.authorService.deleteAuthor(author.id).subscribe({
        next: () => {
          console.log('✅ deleteAuthor - Autor excluído com sucesso');
          this.loadAuthors(); // Recarregar lista
          alert('Autor excluído com sucesso!');
        },
        error: (error) => {
          console.error('❌ deleteAuthor - Erro ao excluir autor:', error);
          this.error = 'Erro ao excluir autor. Tente novamente.';
          this.loading = false;
        }
      });
    }
  }

  formatDate(dateString?: string): string {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('pt-BR');
  }
}
