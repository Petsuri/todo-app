import { Button, Grid, TextField } from '@mui/material';

export function AddNewTask() {
  return (
    <Grid container spacing={2}>
      <Grid item md={8}>
        <TextField
          id='task-input'
          label='What needs to be done'
          variant='standard'
          multiline
          fullWidth
        />
      </Grid>
      <Grid item md={4}>
        <Button variant='contained'>Add task</Button>
      </Grid>
    </Grid>
  );
}
