import { Login, User } from '@hr-acuity/ui/generated';
import { Http } from '@hr-acuity/ui/http';
import { SessionStore } from '@hr-acuity/ui/utils';

const USER_KEY = 'user';

export function getUser() {
  return SessionStore.getItem<User>(USER_KEY);
}

export async function login(credentials: Login) {
  return Http.instance.post<User>('/api/login', credentials).then(({ data }) => {
    SessionStore.setItem(USER_KEY, data)
    return data;
  });
}

export function logout() {
  SessionStore.removeItem(USER_KEY);
}

export function getToken() {
  return getUser()?.token;
}
