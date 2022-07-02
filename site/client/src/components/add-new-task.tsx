import { Button, Grid, TextField } from '@mui/material';
import { PostTaskRequest } from '@todo-app/api-client';
import { useRef } from 'react';

interface Props {
  readonly create: (task: PostTaskRequest) => Promise<void>;
}

export function AddNewTask({ create }: Props) {
  const text = useRef<HTMLInputElement>(null);

  const createNewTask = () => {
    if (text.current === null) {
      return;
    }

    create({
      text: text.current.value,
    }).then((_) => (text.current!.value = ''));
  };

  return (
    <Grid container spacing={2}>
      <Grid item md={8}>
        <TextField
          id='task-input'
          label='What needs to be done'
          variant='standard'
          multiline
          fullWidth
          ref={text}
        />
      </Grid>
      <Grid item md={4}>
        <Button variant='contained' onClick={createNewTask}>
          Add task
        </Button>
      </Grid>
    </Grid>
  );
}
