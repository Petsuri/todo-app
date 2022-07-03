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

  useEffect(() => {
    apiRequests.getTasks().then((response) => setTasks(response));
  }, []);

  return (
    <>
      <AddNewTask create={createTask} />
      <ListOfTasks tasks={tasks} />
    </>
  );
}
