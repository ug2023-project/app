export type User = {
  id: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  fullName: string | null;
  configId: string | null;
};

export type AuthState = {
  data: User | null;
  loading: boolean;
};
