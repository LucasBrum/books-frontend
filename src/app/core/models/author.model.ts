export interface Author {
  id: number;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthorCreateRequest {
  name: string;
}

export interface AuthorUpdateRequest {
  name: string;
}
