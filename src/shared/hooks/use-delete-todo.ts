import { useMutation, useQueryClient } from '@tanstack/react-query';
import { todoListApi } from '../../api/todo-list-api';
import { useSuspenseUser } from './use-user';

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();
  const user = useSuspenseUser();

  const deleteTodoMutation = useMutation({
    mutationFn: todoListApi.deleteTodo,
    onSettled: async () => {
      queryClient.invalidateQueries(
        todoListApi.getTodoListQueryOptions(user.data.id)
      ); // Перезапрашивает данные по определенному ключю в stale и перезапрашивает те которые сейчас активные и на которые есть ссылки
    },
    onSuccess: (_, deletedId) => {
      const key = todoListApi.getTodoListQueryOptions(user.data.id).queryKey;
      const todos = queryClient.getQueryData(key);
      // Pissimistic update
      if (todos) {
        const filteredIdData = todos.filter((todo) => todo.id !== deletedId);
        queryClient.setQueryData(key, filteredIdData);
      }
    },
  });

  //deleteTodoMutation.variables // id удаленной таски

  return {
    deleteTodo: deleteTodoMutation.mutate,
    getIsPending: (id: string) =>
      deleteTodoMutation.isPending && deleteTodoMutation.variables === id,
  };
};
