import { request, RequestOptions } from './request';
import axios from 'axios';

export function axiosRequest(baseUrl: string) {
  const instance = axios.create();

  return function <TResponse>(options: RequestOptions) {
    return request<TResponse>(instance, baseUrl, options);
  };
}
