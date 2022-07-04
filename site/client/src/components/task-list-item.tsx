import { IconButton, ListItem, ListItemText, Stack, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import TaskIcon from '@mui/icons-material/TaskSharp';
import { TaskResponse } from '@todo-app/api-client';

interface Props {
  readonly task: TaskResponse;
  readonly deleteTask: (uuid: string) => Promise<void>;
  readonly setTaskDone: (uuid: string) => Promise<void>;
}

export function TaskListItem({ task, deleteTask, setTaskDone }: Props) {
  const taskStatusColor = task.isDone ? 'success' : 'action';
  const deleteSelected = () => deleteTask(task.uuid);
  const selectedDone = () => {
    if (task.isDone) {
      return;
    }

    return setTaskDone(task.uuid);
  };
  return (
    <ListItem
      secondaryAction={
        <Stack direction='row' spacing={1}>
          <IconButton
            data-testid='set-done-button'
            edge='end'
            aria-label='delete'
            onClick={selectedDone}>
            <TaskIcon data-testid='set-done-icon' color={taskStatusColor} />
          </IconButton>
          <IconButton
            data-testid='delete-button'
            edge='end'
            aria-label='delete'
            onClick={deleteSelected}>
            <DeleteIcon color='error' />
          </IconButton>
        </Stack>
      }>
      <ListItemText
        data-testid='item-text'
        primary={task.text}
        primaryTypographyProps={{ style: { whiteSpace: 'normal' } }}
        sx={{ paddingRight: 6 }}
      />
    </ListItem>
  );
}
