export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  status: 'pending' | 'approved' | 'rejected';
  isAdmin?: boolean;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
}
