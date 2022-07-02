import { request, RequestOptions } from './request';
import axios from 'axios';

export function axiosRequest<TResponse>(baseUrl: string) {
  const instance = axios.create();
  return (options: RequestOptions) => {
    return request<TResponse>(instance, baseUrl, options);
  };
}
