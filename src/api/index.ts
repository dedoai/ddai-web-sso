/* eslint-disable no-useless-catch */
import axios from 'axios';

import { API_AUTH_PATH, API_VERSION } from './const';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

interface IApiWrap {
  data?: any;
  errMsg?: string;
}
export const apiWrap = async (promise: Promise<any>): Promise<IApiWrap> => {
  try {
    const { data } = await promise;
    return data;
  } catch (error) {
    throw error;
  }
};

const pathMiddleware = (path: string, overrideMiddleware?: boolean) => (
  overrideMiddleware
    ? path
    : `${API_VERSION}${API_AUTH_PATH}${path}`
);

export const recaptchaMiddleware = async (
  action: string,
): Promise<string> => new Promise((res) => {
  (window as any).grecaptcha.enterprise.ready(async () => {
    const token = await (window as any).grecaptcha.enterprise.execute(import.meta.env.VITE_RECAPTCHA_KEY, { action });
    res(token);
  });
});

export const apiGet = async (url: string, config?: any) => apiWrap(
  axiosInstance.get(pathMiddleware(url), config),
);
export const apiPost = async (url: string, data: any, config?: any, overrideMiddleware = false) => apiWrap(
  axiosInstance.post(pathMiddleware(url, overrideMiddleware), data, config),
);
export const apiPut = async (url: string, data: any, config?: any) => apiWrap(
  axiosInstance.put(pathMiddleware(url), data, config),
);
export const apiPatch = async (url: string, data: any, config?: any) => apiWrap(
  axiosInstance.patch(pathMiddleware(url), data, config),
);
export const apiDelete = async (url: string, config?: any) => apiWrap(
  axiosInstance.delete(pathMiddleware(url), config),
);
