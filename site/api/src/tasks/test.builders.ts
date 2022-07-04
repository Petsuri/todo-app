import { TaskService, TaskRepository, Task } from './task-service';
import { Builder } from 'builder-pattern';

export function taskBuilder() {
  return Builder<Task>().uuid('x').text('y').isDone(false);
}

export function taskRepositoryBuilder() {
  return Builder<TaskRepository>()
    .save(jest.fn().mockResolvedValue(''))
    .saveAll(jest.fn().mockResolvedValue(''))
    .loadAll(jest.fn().mockResolvedValue([]));
}

export class TaskServiceBuilder {
  private repository = taskRepositoryBuilder().build();
  withRepository(value: TaskRepository) {
    this.repository = value;
    return this;
  }
  build() {
    return new TaskService(this.repository);
  }
}
