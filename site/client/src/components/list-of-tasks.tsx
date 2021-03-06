import { List } from '@mui/material';
import { TaskListItem } from './task-list-item';
import { TaskResponse } from '@todo-app/api-client';

interface Props {
  readonly tasks: TaskResponse[];
  readonly deleteTask: (uuid: string) => Promise<void>;
  readonly setTaskDone: (uuid: string) => Promise<void>;
}

export function ListOfTasks({ tasks, deleteTask, setTaskDone }: Props) {
  return (
    <List>
      {tasks.map((task) => (
        <TaskListItem
          key={task.uuid}
          task={task}
          deleteTask={deleteTask}
          setTaskDone={setTaskDone}
        />
      ))}
    </List>
  );
}
