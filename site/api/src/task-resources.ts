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
  app.put<UuidParams, TaskResponse | ErrorResponse, PostTaskRequest>(
    '/task/:uuid',
    async (req, res) => {
      const result = await taskService.markDone(req.params.uuid);
      if (result) {
        return res.send(result);
      }

      res.statusCode = 404;
      res.send({ message: `Task with ${req.params.uuid} is not found` });
    }
  );

  app.delete<UuidParams, void | ErrorResponse, void>('/task/:uuid', async (req, res) => {
    const result = await taskService.delete(req.params.uuid);
    if (result) {
      res.statusCode = 204;
      return res.send();
    }

    res.statusCode = 404;
    res.send({ message: `Task with ${req.params.uuid} is not found` });
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
