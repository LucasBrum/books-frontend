export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
  email: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  username: string;
  roles: string[];
}

export interface User {
  username: string;
  roles: string[];
  token: string;
}
