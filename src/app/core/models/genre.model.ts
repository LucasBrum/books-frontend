export interface Genre {
  id: number;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface GenreCreateRequest {
  name: string;
}

export interface GenreUpdateRequest {
  name: string;
}
