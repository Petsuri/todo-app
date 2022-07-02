import { axiosRequest } from './axios-request';
import { ListOfTasksResponse, PostTaskRequest, TaskResponse } from './types';

export function apiRequests(baseUrl: string) {
  const request = axiosRequest(baseUrl);

  return {
    createTask: (body: PostTaskRequest) =>
      request<TaskResponse>({ method: 'POST', resource: '/task', body }),
    getTasks: () => request<ListOfTasksResponse>({ method: 'GET', resource: '/task' }),
    markDone: (uuid: string) =>
      request<TaskResponse>({ method: 'PUT', resource: `/task/${encodeURIComponent(uuid)}` }),
    delete: (uuid: string) =>
      request({ method: 'DELETE', resource: `/task/${encodeURIComponent(uuid)}` }),
  };
}
