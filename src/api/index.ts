/* eslint-disable no-useless-catch */
import axios from 'axios';

import { API_PATH, API_VERSION } from './const';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

interface IApiWrap {
  data?: any;
  errMsg?: string;
}
const apiWrap = async (promise: Promise<any>): Promise<IApiWrap> => {
  try {
    const { data } = await promise;
    return data;
  } catch (error) {
    throw error;
  }
};

const pathMiddleware = (path:string) => `${API_VERSION}${API_PATH}${path}`;

export const apiGet = async (url: string, config?: any) => apiWrap(
  axiosInstance.get(pathMiddleware(url), config),
);
export const apiPost = async (url: string, data: any, config?: any) => apiWrap(
  axiosInstance.post(pathMiddleware(url), data, config),
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
