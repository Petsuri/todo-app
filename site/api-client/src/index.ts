import { axiosRequest } from './axios-request';

export function apiRequests(baseUrl: string) {
  const request = axiosRequest(baseUrl);

  return {
    createTask: (body: { text: string }) => request({ method: 'POST', resource: '/task', body }),
    getTasks: () => request({ method: 'GET', resource: '/task' }),
    markDone: (uuid: string) =>
      request({ method: 'PUT', resource: `/task/${encodeURIComponent(uuid)}` }),
    delete: (uuid: string) =>
      request({ method: 'DELETE', resource: `/task/${encodeURIComponent(uuid)}` }),
  };
}
