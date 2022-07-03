import { Express } from 'express';
import { ListOfTaskResources, PostTaskRequest, TaskResponse } from '@todo-app/api-client';

export function addTaskResources(app: Express) {
  app.get<void, ListOfTaskResources, void>('/task', (req, res) => {
    res.send([
      {
        uuid: 'xxx',
        text: 'Testing',
        isDone: false,
      },
    ]);
  });

  app.post<void, TaskResponse, PostTaskRequest>('/task', (req, res) => {});

  app.put<void, TaskResponse, PostTaskRequest>('/task/:uuid', (req, res) => {});

  app.delete<void, void, void>('/task/:uuid', (req, res) => {});
}
