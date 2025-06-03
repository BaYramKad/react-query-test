import { useCreateTodo } from '../../shared/hooks/use-create-todo';

export const InputTodo = () => {
  const { createTodo, createTodoLoading } = useCreateTodo();
  console.log('createTodoLoading: ', createTodoLoading);

  const formClass = 'flex justify-between mb-4 mt-4 gap-2';
  const inputClass = 'flex-1 border border-gray-300 rounded-10 py-2 px-4';
  const buttonClass = `bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer ${
    createTodoLoading && 'disabled:opacity-50'
  }`;
  return (
    <form onSubmit={createTodo} className={formClass}>
      <input className={inputClass} type="text" name="text" />
      <button className={buttonClass} disabled={createTodoLoading}>
        Create
        {createTodoLoading && '1231231'}
      </button>
    </form>
  );
};
