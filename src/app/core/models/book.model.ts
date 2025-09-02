export interface Book {
  id: number;
  title: string;
  description?: string;
  isbn?: string;
  publishedDate?: string;
  authorId: number;
  authorName: string;
  genreId: number;
  genreName: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface BookCreateRequest {
  title: string;
  description?: string;
  isbn?: string;
  publishedDate?: string;
  authorId: number;
  genreId: number;
}

export interface BookUpdateRequest {
  title: string;
  description?: string;
  isbn?: string;
  publishedDate?: string;
  authorId: number;
  genreId: number;
}
