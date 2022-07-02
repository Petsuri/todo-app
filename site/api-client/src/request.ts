import { AxiosRequestConfig, AxiosResponse } from 'axios';

export interface RequestOptions {
  readonly method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  readonly resource: string;
  readonly body?: object;
}

export interface MakeRequest {
  request<T = any, R = AxiosResponse<T>, D = any>(config: AxiosRequestConfig<D>): Promise<R>;
}

export function request<TResponse>(
  makeRequest: MakeRequest,
  baseUrl: string,
  options: RequestOptions
) {
  const settings: AxiosRequestConfig = {
    baseURL: baseUrl,
    url: options.resource,
    data: options.body,
  };

  return makeRequest.request<TResponse>(settings);
}
