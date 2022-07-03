import { IconButton, ListItem, ListItemText, Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import TaskIcon from '@mui/icons-material/TaskSharp';
import { TaskResponse } from '@todo-app/api-client';

interface Props {
  readonly task: TaskResponse;
  readonly deleteTask: (uuid: string) => Promise<void>;
}

export function TaskListItem({ task, deleteTask }: Props) {
  const taskStatusColor = task.isDone ? 'success' : 'action';
  const deleteSelected = () => deleteTask(task.uuid);
  return (
    <ListItem
      secondaryAction={
        <Stack direction='row' spacing={2}>
          <IconButton edge='end' aria-label='delete'>
            <TaskIcon color={taskStatusColor} />
          </IconButton>
          <IconButton edge='end' aria-label='delete' onClick={deleteSelected}>
            <DeleteIcon color='error' />
          </IconButton>
        </Stack>
      }>
      <ListItemText primary={task.text} />
    </ListItem>
  );
}
