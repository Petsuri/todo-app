import { AddNewTask } from './add-new-task';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import { PostTaskRequest } from '@todo-app/api-client';

class AddNewTaskBuilder {
  private create = jest.fn().mockResolvedValue('');

  withCreate(value: jest.Mock) {
    this.create = value;
    return this;
  }
  build() {
    render(<AddNewTask create={this.create} />);

    const input = screen.getByLabelText<HTMLInputElement>('What needs to be done');
    const button = screen.getByTestId<HTMLButtonElement>('add-new-task-btn');

    return {
      input,
      button,
    };
  }
}

describe('AddNewTask', () => {
  it('should have button disabled and text empty when component is initialized', () => {
    const { input, button } = new AddNewTaskBuilder().build();

    expect(input.value).toBe('');
    expect(button.disabled).toBe(true);
  });
  it('should clear text field after adding a task', async () => {
    const { input, button } = new AddNewTaskBuilder().build();

    fireEvent.change(input, { target: { value: 'XXX' } });
    fireEvent.click(button);

    await waitFor(() => expect(input.value).toBe(''));
    expect(button.disabled).toBe(true);
  });
  it('should send expected create task request', async () => {
    const create = jest.fn().mockResolvedValue('');
    const { input, button } = new AddNewTaskBuilder().withCreate(create).build();

    fireEvent.change(input, { target: { value: 'Write more unit tests' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(create).toHaveBeenCalledTimes(1);
    });
    expect(create).toHaveBeenCalledWith({ text: 'Write more unit tests' });
  });
});
