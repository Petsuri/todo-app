import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { addTaskResources } from './task-resources';

export function createServer() {
  const app = express();

  app.use(
    cors({
      origin: 'http://localhost:3000',
      optionsSuccessStatus: 200,
    })
  );
  app.use(bodyParser.json());

  addTaskResources(app);

  return app;
}
