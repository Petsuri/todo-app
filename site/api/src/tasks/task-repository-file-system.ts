import { Task, TaskRepository } from './task-service';
import fs from 'fs';

const TaskFilePath = `${__dirname}/saved-tasks.json`;

export class TaskRepositoryFileSystem implements TaskRepository {
  public async save(task: Task): Promise<void> {
    const currentTasks = await this.loadAll();
    currentTasks.push(task);

    await this.saveAll(currentTasks);
  }

  public async loadAll(): Promise<Task[]> {
    try {
      const tasksJson = await fs.promises.readFile(TaskFilePath, { encoding: 'utf8' });
      return JSON.parse(tasksJson);
    } catch (_fileDoesntExists) {
      return [];
    }
  }

  public async saveAll(tasks: Task[]): Promise<void> {
    const tasksJson = JSON.stringify(tasks);
    await fs.promises.writeFile(TaskFilePath, tasksJson, { encoding: 'utf8' });
  }
}
