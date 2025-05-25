import { type FC } from 'react';
import { type TaskDto } from './api';
import { useTodoList } from './use-todo-list';

export const TodoList: FC = () => {
  const { todoItems, error, isLoading, nextListIsEmpty } = useTodoList();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  // isPending определяет еслть ли в кеше данные если нет то статус panding

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className='mx-auto w-1/2 mt-10 mb-10'>
      <h1 className='text-3xl font-bold mb-10'>Todo List</h1>
      <div>
        {todoItems?.map((task: TaskDto) => {
          return (
            <div key={task.id} className='flex items-center justify-between bg-gray-100 p-4 mb-2 rounded-md cursor-pointer'>
              <div className='flex items-center'>
                <input type='checkbox' checked={task.completed} readOnly className='mr-2' />
                <span className={task.completed ? 'line-through' : ''}>{task.title}</span>
              </div>
            </div>
          );
        })}
      </div>

      {nextListIsEmpty}
    </div>
  );
};
