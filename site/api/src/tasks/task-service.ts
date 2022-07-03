import { v4 as uuidv4 } from 'uuid';

export interface NewTask {
  readonly text: string;
}

export interface Task {
  readonly uuid: string;
  readonly text: string;
  readonly isDone: boolean;
}

export interface TaskRepository {
  save(task: Task): Promise<void>;
  saveAll(tasks: Task[]): Promise<void>;
  loadAll(): Promise<Task[]>;
}

export class TaskService {
  public constructor(private readonly repository: TaskRepository) {}

  public async create(newTask: NewTask): Promise<Task> {
    const task: Task = {
      uuid: uuidv4(),
      text: newTask.text,
      isDone: false,
    };

    await this.repository.save(task);

    return task;
  }

  public loadAll(): Promise<Task[]> {
    return this.repository.loadAll();
  }

  public async delete(uuid: string): Promise<void> {
    const tasks = await this.loadAll();
    const existing = tasks.filter((value) => value.uuid !== uuid);
    await this.repository.saveAll(existing);
  }
}
