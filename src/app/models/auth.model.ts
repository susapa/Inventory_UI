export interface AuthResponse {
  role: any;
  token: string;
  message?: string;
  user?: User;
}

export interface User {
  id?: string;
  email?: string;
  name?: string;
  role?: string;
}

export interface LoginCredentials {
  email: string;
  password?: string;
}

export interface SignupData {
  name: string;
  email: string;
  password?: string;
}
