export interface LoginPayload {
  email: string;
  password: string;
}

export interface TokenResponse {
  accessToken: string;
}

export interface Register {
  fullName: string;
  email: string;
  password: string;
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  createdAt: string;
}

export interface AuthContextType {
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
  loading: boolean;
}
