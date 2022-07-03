import { Button, Grid, TextField } from '@mui/material';
import { PostTaskRequest } from '@todo-app/api-client';
import { useState } from 'react';

interface Props {
  readonly create: (task: PostTaskRequest) => Promise<void>;
}

export function AddNewTask({ create }: Props) {
  const [text, setText] = useState('');
  const [canAdd, setCanAdd] = useState(false);

  const createNewTask = async () => {
    if (!canAdd) {
      return;
    }

    await create({
      text: text,
    }).then((_) => textChanged(''));
  };

  const textChanged = (newValue: string) => {
    setText(newValue);
    setCanAdd(0 < newValue.length);
  };

  return (
    <Grid container spacing={2}>
      <Grid item md={8}>
        <TextField
          id='task-input'
          data-testid='task-input'
          label='What needs to be done'
          variant='standard'
          multiline
          fullWidth
          onChange={(e) => textChanged(e.target.value)}
          value={text}
        />
      </Grid>
      <Grid item md={4}>
        <Button
          data-testid='add-new-task-btn'
          variant='contained'
          onClick={createNewTask}
          disabled={!canAdd}>
          Add task
        </Button>
      </Grid>
    </Grid>
  );
}
