import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Author, AuthorCreateRequest, AuthorUpdateRequest, PagedResponse } from '../models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  private readonly apiUrl = `${environment.apiUrl}/authors`;

  constructor(private http: HttpClient) {}

  getAuthors(params: any = {}): Observable<PagedResponse<Author>> {
    let httpParams = new HttpParams()
      .set('page', (params.page || 0).toString())
      .set('size', (params.size || 20).toString())
      .set('sort', 'name,asc');

    if (params.name) {
      httpParams = httpParams.set('name', params.name);
    }

    return this.http.get<PagedResponse<Author>>(this.apiUrl, { params: httpParams });
  }

  getAuthor(id: number): Observable<Author> {
    return this.http.get<Author>(`${this.apiUrl}/${id}`);
  }

  createAuthor(author: AuthorCreateRequest): Observable<Author> {
    return this.http.post<Author>(this.apiUrl, author);
  }

  updateAuthor(id: number, author: AuthorUpdateRequest): Observable<Author> {
    return this.http.put<Author>(`${this.apiUrl}/${id}`, author);
  }

  deleteAuthor(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getAllAuthors(): Observable<PagedResponse<Author>> {
    return this.getAuthors({ page: 0, size: 1000 });
  }
}
