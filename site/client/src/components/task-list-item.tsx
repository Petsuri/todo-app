import { IconButton, ListItem, ListItemText, Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import TaskIcon from '@mui/icons-material/TaskSharp';

interface Props {
  readonly item: {
    readonly uuid: string;
    readonly text: string;
    readonly isDone: boolean;
  };
}

export function TaskListItem({ item }: Props) {
  const taskStatusColor = item.isDone ? 'success' : 'action';
  return (
    <ListItem
      key={item.uuid}
      secondaryAction={
        <Stack direction='row' spacing={2}>
          <IconButton edge='end' aria-label='delete'>
            <TaskIcon color={taskStatusColor} />
          </IconButton>
          <IconButton edge='end' aria-label='delete'>
            <DeleteIcon color='error' />
          </IconButton>
        </Stack>
      }>
      <ListItemText primary={item.text} />
    </ListItem>
  );
}
