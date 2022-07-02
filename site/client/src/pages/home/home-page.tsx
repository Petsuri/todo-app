import { AddNewTask, ListOfTasks } from '../../components';

const testItems = [
  {
    uuid: '1',
    text: 'jou',
    isDone: true,
  },
  {
    uuid: '2',
    text: 'jepulis',
    isDone: false,
  },
];

export function HomePage() {
  return (
    <>
      <AddNewTask />
      <ListOfTasks items={testItems} />
    </>
  );
}
