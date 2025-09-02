import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { GenreService } from '../../../core/services/genre.service';
import { Genre, PagedResponse } from '../../../core/models';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-genres-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  templateUrl: './genres-list.component.html',
  styleUrl: './genres-list.component.scss'
})
export class GenresListComponent implements OnInit {
  genres: Genre[] = [];
  loading = false;
  error: string | null = null;
  pagination: any = null;
  
  // Search and filters
  searchTerm = '';
  currentPage = 0;
  pageSize = 10;
  private searchSubject = new Subject<string>();

  constructor(private genreService: GenreService) {
    // Setup search debounce
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(searchTerm => {
      this.currentPage = 0;
      this.loadGenres();
    });
  }

  ngOnInit(): void {
    console.log('🔍 ngOnInit - Iniciando componente de gêneros');
    this.loadGenres();
  }

  loadGenres(): void {
    console.log('🏷️ loadGenres - Iniciando carregamento de gêneros');
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
    
    console.log('🔍 loadGenres - Parâmetros:', params);
    
    this.genreService.getGenres(params).subscribe({
      next: (response: PagedResponse<Genre>) => {
        console.log('✅ loadGenres - Resposta da API:', response);
        this.genres = response.content;
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
        console.error('❌ loadGenres - Erro na API:', error);
        this.error = 'Erro ao carregar gêneros. Tente novamente.';
        this.loading = false;
      }
    });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadGenres();
  }

  onSearchChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchTerm = target.value;
    this.searchSubject.next(target.value);
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.currentPage = 0;
    this.loadGenres();
  }

  onPageSizeChange(size: number): void {
    this.pageSize = size;
    this.currentPage = 0;
    this.loadGenres();
  }

  deleteGenre(genre: Genre): void {
    if (confirm(`Tem certeza que deseja excluir o gênero "${genre.name}"? Esta ação não pode ser desfeita.`)) {
      this.loading = true;
      
      this.genreService.deleteGenre(genre.id).subscribe({
        next: () => {
          console.log('✅ deleteGenre - Gênero excluído com sucesso');
          this.loadGenres(); // Recarregar lista
          alert('Gênero excluído com sucesso!');
        },
        error: (error) => {
          console.error('❌ deleteGenre - Erro ao excluir gênero:', error);
          this.error = 'Erro ao excluir gênero. Tente novamente.';
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
