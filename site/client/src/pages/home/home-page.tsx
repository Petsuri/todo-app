import { useEffect, useState } from 'react';
import { AddNewTask, ListOfTasks } from '../../components';
import apiRequests from '../../api';
import { ListOfTasksResponse } from '@todo-app/api-client';
import { PostTaskRequest } from '@todo-app/api-client';

export function HomePage() {
  const [tasks, setTasks] = useState<ListOfTasksResponse>([]);
  const createTask = async (task: PostTaskRequest) => {
    const value = await apiRequests.createTask(task);
    return setTasks(tasks.concat([value]));
  };

  const deleteTask = async (uuid: string) => {
    await apiRequests.delete(uuid);
    await reloadTasks();
  };

  const setTaskDone = async (uuid: string) => {
    await apiRequests.markDone(uuid);
    await reloadTasks();
  };

  const reloadTasks = async () => {
    const responseTasks = await apiRequests.getTasks();
    setTasks(responseTasks);
  };

  useEffect(() => {
    reloadTasks();
  }, []);

  return (
    <>
      <AddNewTask create={createTask} />
      <ListOfTasks tasks={tasks} deleteTask={deleteTask} setTaskDone={setTaskDone} />
    </>
  );
}
