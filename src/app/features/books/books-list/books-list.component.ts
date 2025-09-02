import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BookService } from '../../../core/services/book.service';
import { AuthorService } from '../../../core/services/author.service';
import { GenreService } from '../../../core/services/genre.service';
import { Book, Author, Genre, PagedResponse } from '../../../core/models';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-books-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  templateUrl: './books-list.component.html',
  styleUrl: './books-list.component.scss'
})
export class BooksListComponent implements OnInit {
  books: Book[] = [];
  authors: Author[] = [];
  genres: Genre[] = [];
  loading = false;
  error: string | null = null;
  pagination: any = null;
  
  // Search and filters
  searchTerm = '';
  selectedAuthorId: number | null = null;
  selectedGenreId: number | null = null;
  currentPage = 0;
  pageSize = 10;
  private searchSubject = new Subject<string>();



  constructor(
    private bookService: BookService,
    private authorService: AuthorService,
    private genreService: GenreService
  ) {
    // Setup search debounce
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(searchTerm => {
      this.currentPage = 0;
      this.loadBooks();
    });
  }

  ngOnInit(): void {
    console.log('🔍 ngOnInit - Iniciando componente de livros');
    this.loadBooks();
    this.loadAuthors();
    this.loadGenres();
  }

  loadBooks(): void {
    console.log('📚 loadBooks - Iniciando carregamento de livros');
    this.loading = true;
    this.error = null;
    
    // Preparar parâmetros de busca
    const params: any = {
      page: this.currentPage,
      size: this.pageSize
    };
    
    if (this.searchTerm.trim()) {
      params.title = this.searchTerm.trim();
    }
    
    if (this.selectedAuthorId) {
      params.authorId = this.selectedAuthorId;
    }
    
    if (this.selectedGenreId) {
      params.genreId = this.selectedGenreId;
    }
    
    console.log('🔍 loadBooks - Parâmetros:', params);
    
    this.bookService.getBooks(params).subscribe({
      next: (response: PagedResponse<Book>) => {
        console.log('✅ loadBooks - Resposta da API:', response);
        this.books = response.content;
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
        console.error('❌ loadBooks - Erro na API:', error);
        this.error = 'Erro ao carregar livros. Tente novamente.';
        this.loading = false;
      }
    });
  }

  loadAuthors(): void {
    console.log('👥 loadAuthors - Carregando autores da API');
    this.authorService.getAllAuthors().subscribe({
      next: (response: PagedResponse<Author>) => {
        console.log('✅ loadAuthors - Autores carregados:', response);
        this.authors = response.content;
      },
      error: (error) => {
        console.error('❌ loadAuthors - Erro ao carregar autores:', error);
      }
    });
  }

  loadGenres(): void {
    console.log('🏷️ loadGenres - Carregando gêneros da API');
    this.genreService.getAllGenres().subscribe({
      next: (response: PagedResponse<Genre>) => {
        console.log('✅ loadGenres - Gêneros carregados:', response);
        this.genres = response.content;
      },
      error: (error) => {
        console.error('❌ loadGenres - Erro ao carregar gêneros:', error);
      }
    });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadBooks();
  }

  onSearchChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchTerm = target.value;
    this.searchSubject.next(target.value);
  }

  onAuthorFilterChange(authorId: number | null): void {
    this.selectedAuthorId = authorId;
    this.currentPage = 0;
    this.loadBooks();
  }

  onGenreFilterChange(genreId: number | null): void {
    this.selectedGenreId = genreId;
    this.currentPage = 0;
    this.loadBooks();
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.selectedAuthorId = null;
    this.selectedGenreId = null;
    this.currentPage = 0;
    this.loadBooks();
  }

  onPageSizeChange(size: number): void {
    this.pageSize = size;
    this.currentPage = 0;
    this.loadBooks();
  }

  deleteBook(book: Book): void {
    if (confirm(`Tem certeza que deseja excluir o livro "${book.title}"? Esta ação não pode ser desfeita.`)) {
      this.loading = true;
      
      this.bookService.deleteBook(book.id).subscribe({
        next: () => {
          console.log('✅ deleteBook - Livro excluído com sucesso');
          this.loadBooks(); // Recarregar lista
          alert('Livro excluído com sucesso!');
        },
        error: (error) => {
          console.error('❌ deleteBook - Erro ao excluir livro:', error);
          this.error = 'Erro ao excluir livro. Tente novamente.';
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
