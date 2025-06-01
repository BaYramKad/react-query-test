import { useCreateTodo } from '../../shared/hooks/use-create-todo';

export const InputTodo = () => {
  const { createTodo, isLoadingMutation } = useCreateTodo();

  const formClass = 'flex justify-between mb-4 gap-2';
  const inputClass = 'w-full border border-gray-300 rounded-10 py-2 px-4';
  const buttonClass = `bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer ${
    isLoadingMutation && 'disabled:opacity-50'
  }`;
  return (
    <form onSubmit={createTodo} className={formClass}>
      <input className={inputClass} type="text" name="text" />
      <button className={buttonClass} disabled={isLoadingMutation}>
        Create
      </button>
    </form>
  );
};
