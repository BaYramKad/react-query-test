import { useMutation, useQueryClient } from '@tanstack/react-query';
import { todoListApi } from '../../api/todo-list-api';
import { nanoid } from 'nanoid';

export const useCreateTodo = () => {
  const queryClientRefeth = useQueryClient();

  const createTodoMutation = useMutation({
    mutationFn: todoListApi.createTodo,
    onSettled: async () => {
      await queryClientRefeth.invalidateQueries(
        todoListApi.getTodoListQueryOptions()
      ); // Перезапрашивает данные по определенному ключю в stale и перезапрашивает те которые сейчас активные и на которые есть ссылки
    },
  });

  const createTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const text = String(new FormData(event.currentTarget).get('text'));
    if (!text.length) return;

    createTodoMutation.mutate({
      completed: false,
      id: nanoid(),
      title: text,
      description: '',
    });

    event.currentTarget.reset();
  };

  return {
    createTodo,
    isLoadingMutation: createTodoMutation.isPending,
  };
};
