import { fireEvent, render, screen } from '@testing-library/react';
import { TaskResponse } from '@todo-app/api-client';
import { TaskListItem } from './task-list-item';

class TaskListItemBuilder {
  private task: TaskResponse = { uuid: 'x', text: 'XXX', isDone: false };
  private deleteTask = jest.fn().mockResolvedValue('');
  private setTaskDone = jest.fn().mockResolvedValue('');

  withTask(value: TaskResponse) {
    this.task = value;
    return this;
  }

  withDelete(value: jest.Mock) {
    this.deleteTask = value;
    return this;
  }

  withSetDone(value: jest.Mock) {
    this.setTaskDone = value;
    return this;
  }

  build() {
    render(
      <TaskListItem task={this.task} deleteTask={this.deleteTask} setTaskDone={this.setTaskDone} />
    );

    const itemText = screen.getByTestId('item-text');
    const setDoneButton = screen.getByTestId<HTMLButtonElement>('set-done-button');
    const setDoneIcon = screen.getByTestId('set-done-icon');
    const deleteButton = screen.getByTestId<HTMLButtonElement>('delete-button');
    return {
      itemText,
      setDoneButton,
      setDoneIcon,
      deleteButton,
    };
  }
}

describe('TaskListItem', () => {
  it('should render item with given text', () => {
    const { itemText } = new TaskListItemBuilder()
      .withTask({ uuid: '', text: 'XXX_YYY', isDone: false })
      .build();

    expect(itemText.textContent).toBe('XXX_YYY');
  });
  it('should not set task done again if already done', () => {
    const setTaskDone = jest.fn().mockResolvedValue('');
    const { setDoneButton } = new TaskListItemBuilder()
      .withTask({ uuid: '', text: '', isDone: true })
      .withSetDone(setTaskDone)
      .build();

    fireEvent.click(setDoneButton);
    fireEvent.click(setDoneButton);

    expect(setTaskDone).toHaveBeenCalledTimes(0);
  });
  it('should set expected task status color for done', () => {
    const { setDoneIcon } = new TaskListItemBuilder()
      .withTask({ uuid: '', text: '', isDone: true })
      .build();

    expect(setDoneIcon).toHaveClass('MuiSvgIcon-colorSuccess');
  });
  it('should set expected task status color for unfinished task', () => {
    const { setDoneIcon } = new TaskListItemBuilder()
      .withTask({ uuid: '', text: '', isDone: false })
      .build();

    expect(setDoneIcon).toHaveClass('MuiSvgIcon-colorAction');
  });
  it('should set task done when set done is clicked', () => {
    const setTaskDone = jest.fn().mockResolvedValue('');
    const { setDoneButton } = new TaskListItemBuilder()
      .withTask({ uuid: 'X_UUID_X', text: '', isDone: false })
      .withSetDone(setTaskDone)
      .build();

    fireEvent.click(setDoneButton);

    expect(setTaskDone).toHaveBeenCalledTimes(1);
    expect(setTaskDone).toHaveBeenCalledWith('X_UUID_X');
  });
  it('should delete task when delete is clicked', () => {
    const deleteTask = jest.fn().mockResolvedValue('');
    const { deleteButton } = new TaskListItemBuilder()
      .withTask({ uuid: 'Y_UUID_Y', text: '', isDone: false })
      .withDelete(deleteTask)
      .build();

    fireEvent.click(deleteButton);

    expect(deleteTask).toHaveBeenCalledTimes(1);
    expect(deleteTask).toHaveBeenCalledWith('Y_UUID_Y');
  });
});
