import express from 'express';
import cors from 'cors';
import { addTaskResources } from './task-resources';

export function createServer() {
  const app = express();

  app.use(
    cors({
      origin: 'http://localhost:3000',
      optionsSuccessStatus: 200,
    })
  );

  addTaskResources(app);

  return app;
}
