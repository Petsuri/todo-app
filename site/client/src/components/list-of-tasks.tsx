import { List } from '@mui/material';
import { TaskListItem } from './task-list-item';
import { TaskResponse } from '@todo-app/api-client';

interface Props {
  readonly tasks: TaskResponse[];
}

export function ListOfTasks({ tasks }: Props) {
  return (
    <List>
      {tasks.map((task) => (
        <TaskListItem task={task} />
      ))}
    </List>
  );
}
