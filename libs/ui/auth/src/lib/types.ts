import { Login, User } from '@hr-acuity/ui/generated';

export type LoginFn = (credentials: Login) => Promise<User | null>;
export type LogoutFn = () => void;
export type GetUserFn = () => User | null;

export interface ProvidedAuthProps {
  login: LoginFn
  logout: LogoutFn;
  getUser: GetUserFn;
}

export interface AuthContextProps extends ProvidedAuthProps {
  user: User | null;
  error: string;
  loading: boolean;
}
