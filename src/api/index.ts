/* eslint-disable no-useless-catch */
import axios from 'axios';

import { API_AUTH_PATH, API_VERSION } from './const';

type DefaultApiDto = {
  status: 'success' | 'error';
  error?: string;
  errMsg?: string; // This is the error, boundary from useQuery
}

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

interface IApiWrap<T> {
  data?: T;
  errMsg?: string;
}
export const apiWrap = async <T>(promise: Promise<any>): Promise<IApiWrap<T & DefaultApiDto>> => {
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
  window.grecaptcha.enterprise.ready(async () => {
    const token = await window.grecaptcha.enterprise.execute(import.meta.env.VITE_RECAPTCHA_KEY, { action });
    res(token);
  });
});

export const apiGet = async <T>(url: string, config?: any) => apiWrap<T>(
  axiosInstance.get(pathMiddleware(url), config),
);
export const apiPost = async <T>(url: string, data: any, config?: any, overrideMiddleware = false) => apiWrap<T>(
  axiosInstance.post(pathMiddleware(url, overrideMiddleware), data, config),
);
export const apiPut = async <T>(url: string, data: any, config?: any) => apiWrap<T>(
  axiosInstance.put(pathMiddleware(url), data, config),
);
export const apiPatch = async <T>(url: string, data: any, config?: any) => apiWrap<T>(
  axiosInstance.patch(pathMiddleware(url), data, config),
);
export const apiDelete = async <T>(url: string, config?: any) => apiWrap<T>(
  axiosInstance.delete(pathMiddleware(url), config),
);
