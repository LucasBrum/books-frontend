import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Genre, GenreCreateRequest, GenreUpdateRequest, PagedResponse } from '../models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GenreService {
  private readonly apiUrl = `${environment.apiUrl}/genres`;

  constructor(private http: HttpClient) {}

  getGenres(params: any = {}): Observable<PagedResponse<Genre>> {
    let httpParams = new HttpParams()
      .set('page', (params.page || 0).toString())
      .set('size', (params.size || 20).toString())
      .set('sort', 'name,asc');

    if (params.name) {
      httpParams = httpParams.set('name', params.name);
    }

    return this.http.get<PagedResponse<Genre>>(this.apiUrl, { params: httpParams });
  }

  getGenre(id: number): Observable<Genre> {
    return this.http.get<Genre>(`${this.apiUrl}/${id}`);
  }

  createGenre(genre: GenreCreateRequest): Observable<Genre> {
    return this.http.post<Genre>(this.apiUrl, genre);
  }

  updateGenre(id: number, genre: GenreUpdateRequest): Observable<Genre> {
    return this.http.put<Genre>(`${this.apiUrl}/${id}`, genre);
  }

  deleteGenre(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getAllGenres(): Observable<PagedResponse<Genre>> {
    return this.getGenres({ page: 0, size: 1000 });
  }
}
