/* eslint-disable import/no-named-as-default */
import Axios, {
  AxiosError, AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig
} from 'axios';

import { LogoutFn } from '@hr-acuity/ui/auth';

import { GetTokenFn } from './types';

function withUser(getToken: GetTokenFn): (config: AxiosRequestConfig)=> InternalAxiosRequestConfig {
  return (config: AxiosRequestConfig): InternalAxiosRequestConfig => {

    const headers = config.headers ?? {};
    const token = getToken();

    const authHeader = token ? {
      Authorization: `Bearer ${token}`
    } : {};

    config.headers = {
      ...headers,
      Accept: 'application/json',
      'Content-Type': headers['Content-Type'] ?? 'application/json',
      ...authHeader
    };

    return config as InternalAxiosRequestConfig;
  }
}

/**
 *  Obviously my little server is never going to actually return a 401, but I
 *  wanted to give a nod to life in a real app.
 */
function withLogout(logout: LogoutFn): (error: AxiosError) => Promise<AxiosError> {
  return (error: AxiosError) => {
    if (error.status === 401 && !error.request.url.includes('login')) {
      logout();
    }

    console.error(error);

    return Promise.reject(error);
  }
}

export class HttpService {
  private _instance?: AxiosInstance;

  get instance() {
    if (!this._instance) {
      throw new Error('Http used before initialization.')
    }

    return this._instance;
  }

  /**
   * In a real app, I'd have functions for generic success/error handlers in addition to the authentication stuff,
   * but I feel like this is enough to get the point across: wrap axios to take care of the boilerplate while
   * giving application teams a way to fit any unique needs.
   */
  init(getToken: GetTokenFn, logout: LogoutFn) {
    this._instance = Axios.create();
    this._instance.interceptors.request.use(withUser(getToken));
    this._instance.interceptors.response.use(r => r, withLogout(logout))
  }
}

export const Http = new HttpService();
