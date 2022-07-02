export interface PostTaskRequest {
  readonly text: string;
}

export interface TaskResponse {
  readonly uuid: string;
  readonly text: string;
  readonly isDone: boolean;
}

export type ListOfTasksResponse = TaskResponse[];
