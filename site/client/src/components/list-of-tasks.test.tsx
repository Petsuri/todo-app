import { render, screen } from '@testing-library/react';
import { ListOfTasks } from './list-of-tasks';

describe('ListOfTasks', () => {
  it('should list all given tasks', () => {
    render(
      <ListOfTasks
        deleteTask={jest.fn().mockImplementation()}
        setTaskDone={jest.fn().mockImplementation()}
        tasks={[
          {
            uuid: 'first',
            text: 'first_task',
            isDone: false,
          },
          {
            uuid: 'second',
            text: 'second_task',
            isDone: false,
          },
        ]}
      />
    );

    expect(screen.getByText('first_task')).toBeInTheDocument();
    expect(screen.getByText('second_task')).toBeInTheDocument();
  });
});
