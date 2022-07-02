import { List } from '@mui/material';
import { TaskListItem } from './task-list-item';
interface Props {
  readonly items: {
    readonly uuid: string;
    readonly text: string;
    readonly isDone: boolean;
  }[];
}

export function ListOfTasks({ items }: Props) {
  return (
    <List>
      {items.map((item) => (
        <TaskListItem item={item} />
      ))}
    </List>
  );
}
