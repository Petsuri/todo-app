import { IconButton, ListItem, ListItemText, Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import TaskIcon from '@mui/icons-material/TaskSharp';
import { TaskResponse } from '@todo-app/api-client';

interface Props {
  readonly task: TaskResponse;
}

export function TaskListItem({ task }: Props) {
  const taskStatusColor = task.isDone ? 'success' : 'action';
  return (
    <ListItem
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
      <ListItemText primary={task.text} />
    </ListItem>
  );
}
