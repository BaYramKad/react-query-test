import { useMutation, useQueryClient } from '@tanstack/react-query';
import { todoListApi } from './api';
import { nanoid } from 'nanoid';

export const useCreateTodo = () => {
  const queryClientRefeth = useQueryClient();

  const mutateTodo = useMutation({
    mutationFn: todoListApi.createTodo,
  });

  function create(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const text = String(formData.get('text')).trim();

    if (!text.length) return;

    mutateTodo.mutate(
      {
        completed: false,
        id: nanoid(),
        title: text,
        description: '',
      },
      {
        onSettled() {
          queryClientRefeth.invalidateQueries(todoListApi.getTodoListQueryOptions()); // Перезапрашивает данные по определенному ключю в stale и перезапрашивает те которые сейчас активные и на которые есть ссылки
        },
      }
    );
    event.currentTarget.reset();
  }

  return {
    create,
  };
};
