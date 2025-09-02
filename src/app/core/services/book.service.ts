import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book, BookCreateRequest, BookUpdateRequest, PagedResponse } from '../models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private readonly apiUrl = `${environment.apiUrl}/books`;

  constructor(private http: HttpClient) {}

  getBooks(params: any = {}): Observable<PagedResponse<Book>> {
    let httpParams = new HttpParams()
      .set('page', (params.page || 0).toString())
      .set('size', (params.size || 20).toString())
      .set('sort', 'title,asc');

    if (params.title) {
      httpParams = httpParams.set('title', params.title);
    }
    if (params.authorId) {
      httpParams = httpParams.set('authorId', params.authorId.toString());
    }
    if (params.genreId) {
      httpParams = httpParams.set('genreId', params.genreId.toString());
    }

    return this.http.get<PagedResponse<Book>>(this.apiUrl, { params: httpParams });
  }

  getBook(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/${id}`);
  }

  createBook(book: BookCreateRequest): Observable<Book> {
    return this.http.post<Book>(this.apiUrl, book);
  }

  updateBook(id: number, book: BookUpdateRequest): Observable<Book> {
    return this.http.put<Book>(`${this.apiUrl}/${id}`, book);
  }

  deleteBook(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
