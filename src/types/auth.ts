
export type User = {
  id: string;
  email: string;
  name?: string;
  emailConfirmedAt?: string;
};

export type AuthState = {
  user: User | null;
  loading: boolean;
  error: string | null;
};

export type SignUpFormCredentials = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type SignUpCredentials = {
  name: string;
  email: string;
  password: string;
};

export type LoginCredentials = {
  email: string;
  password: string;
};

export type PasswordResetCredentials = {
  email: string;
};
