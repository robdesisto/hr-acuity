import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import { mockUser } from '@hr-acuity/testing';

import { useAuth } from './auth.context';
import { ProvideAuth } from './auth.provider';
import { GetUserFn, LoginFn, LogoutFn } from './types';

const credentials = { username: 'test', password: 'test' };

function Consumer() {
  const { user, login, logout } = useAuth();

  return (
    user ?
    <div>
      Authenticated
      <button onClick={() => logout()}>Submit</button>
    </div> :
    <div>
      Login
      <button onClick={() => login(credentials)}>Submit</button>
    </div>
  )
}

describe('auth', () => {
  let getUser: GetUserFn;
  let login: LoginFn;
  let logout: LogoutFn;

  beforeEach(() => {
    getUser = jest.fn();
    login = jest.fn();
    logout = jest.fn();
  })

  it('should load the user', () => {
    getUser = jest.fn(() => mockUser());

    render(
      <ProvideAuth login={login} logout={logout} getUser={getUser}>
        <Consumer />
      </ProvideAuth>
    );

    expect(screen.getByText('Authenticated')).toBeTruthy();
  });

  it('should handle no user', () => {
    render(
      <ProvideAuth login={login} logout={logout} getUser={getUser}>
        <Consumer />
      </ProvideAuth>
    );

    expect(screen.getByText('Login')).toBeTruthy();
  });

  it('should login', async () => {
    login = jest.fn(async () => mockUser());

    render(
      <ProvideAuth login={login} logout={logout} getUser={getUser}>
        <Consumer />
      </ProvideAuth>
    );

    await userEvent.click(screen.getByRole('button'));

    expect(login).toHaveBeenCalledWith(credentials);
    expect(screen.getByText('Authenticated')).toBeTruthy();
  });

  it('should logout', async () => {
    getUser = jest.fn(() => mockUser());

    render(
      <ProvideAuth login={login} logout={logout} getUser={getUser}>
        <Consumer />
      </ProvideAuth>
    );

    await userEvent.click(screen.getByRole('button'));

    expect(logout).toHaveBeenCalledTimes(1);
    expect(screen.getByText('Login')).toBeTruthy();
  });
});

