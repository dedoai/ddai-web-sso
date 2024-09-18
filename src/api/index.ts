/* eslint-disable no-useless-catch */
import axios, { type AxiosRequestConfig } from 'axios';

import { API_AUTH_PATH, API_VERSION } from './const';

type DefaultApiDto = {
  description?: string;
  errMsg?: string; // This is the error, boundary from useQuery
  statusCode: number;
}

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

type TApiWrapDto<T> = {
  data?: T;
  errMsg?: string;
}
interface IApiWrapArgs {
  promise: Promise<any>;
  onErrorCb?: (error: any) => void;
  onSuccessCb?: (data: any) => void;
}
export const apiWrap = async <T>(
  promise: IApiWrapArgs['promise'],
  onErrorCb?: IApiWrapArgs['onErrorCb'],
  onSuccessCb?: IApiWrapArgs['onSuccessCb'],
): Promise<TApiWrapDto<T & DefaultApiDto>> => {
  try {
    const { data } = await promise;
    onSuccessCb?.(data);
    return data;
  } catch (error) {
    onErrorCb?.(error);
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

interface IApiProps {
  config?: AxiosRequestConfig<any>;
  onErrorCb?: IApiWrapArgs['onErrorCb'];
  onSuccessCb?: IApiWrapArgs['onSuccessCb'];
  url: string;
}

interface IApiPropsEnhanced extends IApiProps {
  data: any;
  overrideMiddleware?: boolean;
}

export const apiGet = async <T>({
  config,
  onErrorCb,
  onSuccessCb,
  url,
}: IApiProps) => apiWrap<T>(
  axiosInstance.get(pathMiddleware(url), config),
  onErrorCb,
  onSuccessCb,
);
export const apiPost = async <T>({
  config,
  data,
  onErrorCb,
  onSuccessCb,
  overrideMiddleware = false,
  url,
}: IApiPropsEnhanced) => apiWrap<T>(
  axiosInstance.post(pathMiddleware(url, overrideMiddleware), data, config),
  onErrorCb,
  onSuccessCb,
);
export const apiPut = async <T>({
  config,
  data,
  onErrorCb,
  onSuccessCb,
  url,
  overrideMiddleware = false,
}: IApiPropsEnhanced) => apiWrap<T>(
  axiosInstance.put(pathMiddleware(url, overrideMiddleware), data, config),
  onErrorCb,
  onSuccessCb,
);
export const apiPatch = async <T>({
  config,
  data,
  onErrorCb,
  onSuccessCb,
  overrideMiddleware = false,
  url,
}: IApiPropsEnhanced) => apiWrap<T>(
  axiosInstance.patch(pathMiddleware(url, overrideMiddleware), data, config),
  onErrorCb,
  onSuccessCb,
);
export const apiDelete = async <T>({
  config,
  onErrorCb,
  onSuccessCb,
  url,
}: IApiProps) => apiWrap<T>(
  axiosInstance.delete(pathMiddleware(url), config),
  onErrorCb,
  onSuccessCb,
);

export * from './const';
