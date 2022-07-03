import { Express } from 'express';
import {
  ErrorResponse,
  ListOfTasksResponse,
  PostTaskRequest,
  TaskResponse,
} from '@todo-app/api-client';
import { TaskService } from './tasks/task-service';
import { TaskRepositoryFileSystem } from './tasks/task-repository-file-system';

const taskService = new TaskService(new TaskRepositoryFileSystem());

export function addTaskResources(app: Express) {
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

  app.put<void, TaskResponse, PostTaskRequest>('/task/:uuid', (_req, _res) => {});

  app.delete<void, void, void>('/task/:uuid', (_req, _res) => {});
}
