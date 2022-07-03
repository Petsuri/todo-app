import { IconButton, ListItem, ListItemText, Stack } from '@mui/material';
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
          <IconButton edge='end' aria-label='delete' onClick={selectedDone}>
            <TaskIcon color={taskStatusColor} />
          </IconButton>
          <IconButton edge='end' aria-label='delete' onClick={deleteSelected}>
            <DeleteIcon color='error' />
          </IconButton>
        </Stack>
      }>
      <ListItemText secondary={task.text} sx={{ wordWrap: 'break-word', paddingRight: 6 }} />
    </ListItem>
  );
}
