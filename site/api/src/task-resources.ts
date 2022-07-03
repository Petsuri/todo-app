import { Express } from 'express';
import {
  ErrorResponse,
  ListOfTasksResponse,
  PostTaskRequest,
  TaskResponse,
} from '@todo-app/api-client';
import { TaskService } from './tasks/task-service';
import { TaskRepositoryFileSystem } from './tasks/task-repository-file-system';

export interface UuidParams {
  readonly uuid: string;
}

const taskService = new TaskService(new TaskRepositoryFileSystem());

export function addTaskResources(app: Express) {
  app.put<void, TaskResponse, PostTaskRequest>('/task/:uuid', (_req, _res) => {});

  app.delete<UuidParams, void, void>('/task/:uuid', async (req, res) => {
    await taskService.delete(req.params.uuid);
    res.statusCode = 204;
    res.send();
  });

  app.get<void, ListOfTasksResponse, void>('/task', async (_req, res) => {
    const tasks = await taskService.loadAll();
    res.send(tasks);
  });

  app.post<void, TaskResponse | ErrorResponse, PostTaskRequest>('/task', async (req, res) => {
    if (!req.body.text) {
      res.statusCode = 400;
      return res.send({ message: 'text is missing from body' });
    }

    const createdTask = await taskService.create(req.body);
    res.send(createdTask);
  });
}
