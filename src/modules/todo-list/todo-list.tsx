import { type FC } from 'react';
import type { TaskDto } from '../../shared/types/todo-types';
import { useTodoList } from '../../shared/hooks/use-todo-list';
import { InputTodo } from '../input-todo/input-todo';
import { DeleteTaskIcon } from '../../shared/ui/delete-icon';
import { useDeleteTodo } from '../../shared/hooks/use-delete-todo';
import { ToggleTodo } from '../../shared/ui/toggle-icon';
import { useToggleTodo } from '../../shared/hooks/use-toggle-todo';

export const TodoList: FC = () => {
  const { todoItems } = useTodoList();
  const { deleteTodo, getIsPending } = useDeleteTodo();
  const { toggleTodo } = useToggleTodo();

  return (
    <div className="text-white mx-auto w-1/3 mt-10 mb-10 bg-gray-900 p-6 rounded-lg shadow-lg">
      <InputTodo />
      <div className="flex gap-2 flex-col h-[400px] max-h-full overflow-auto">
        {todoItems?.map((task: TaskDto) => {
          return (
            <div
              key={task.id}
              className="flex items-center justify-between bg-gray-100 rounded-md cursor-pointer"
            >
              <label className="flex items-center justify-center flex-1 p-4 cursor-pointer">
                <ToggleTodo
                  isToggle={task.completed}
                  toggleChecked={() => toggleTodo(task.id, task.completed)}
                />
                <span className={`text-black font-medium- flex-1 ml-2`}>
                  {task.title}
                </span>
              </label>
              <DeleteTaskIcon
                onClick={() => deleteTodo(task.id)}
                className={`${
                  getIsPending(task.id) && 'disabled:opacity-50'
                } cursor-pointer border-1 border-red-500 p-1 rounded-md mx-3`}
                disabled={getIsPending(task.id)}
                svgClasses={{ fill: 'red' }}
                width={20}
                height={20}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
