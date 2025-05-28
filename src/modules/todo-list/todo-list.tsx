import { type FC } from 'react';
import { type TaskDto } from './api';
import { useTodoList } from './use-todo-list';
import { useCreateTodo } from './use-create-todo';

export const TodoList: FC = () => {
  const { todoItems, error, isLoading } = useTodoList();
  const { create } = useCreateTodo();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className='text-white mx-auto w-1/2 mt-10 mb-10 bg-gray-900 p-6 rounded-lg shadow-lg'>
      <h1 className='text-3xl font-bold mb-10 '>Todo List</h1>
      <form className='mb-4' onSubmit={create}>
        <input className='border border-gray-300 rounded-10 py-2 px-4' type='text' name='text' />
        <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer ml-2'>
          Add
        </button>
      </form>
      <div>
        {todoItems?.map((task: TaskDto) => {
          return (
            <div key={task.id} className='flex items-center justify-between bg-gray-100 p-4 mb-2 rounded-md cursor-pointer'>
              <div className='flex items-center'>
                <input type='checkbox' checked={task.completed} readOnly className='mr-2' />
                <span className={`text-black font-bold`}>{task.title}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
