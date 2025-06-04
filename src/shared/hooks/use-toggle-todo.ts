import { useMutation, useQueryClient } from '@tanstack/react-query';
import { todoListApi } from '../../api/todo-list-api';
import { useSuspenseUser } from './use-user';

export const useToggleTodo = () => {
  const queryClient = useQueryClient();
  const user = useSuspenseUser();

  const toggleTodoMutation = useMutation({
    mutationFn: todoListApi.toggleTodo,
    onMutate: async (newTodo) => {
      const queryKeyOption = {
        queryKey: [todoListApi.baseKey],
      };

      queryClient.cancelQueries(queryKeyOption);
      const previosData = queryClient.getQueryData(
        todoListApi.getTodoListQueryOptions(user.data.id).queryKey
      );

      queryClient.setQueryData(
        todoListApi.getTodoListQueryOptions(user.data.id).queryKey,
        (oldData) =>
          oldData?.map((todo) =>
            todo.id === newTodo.id ? { ...todo, ...newTodo } : todo
          )
      );

      return { previosData };
    },

    onError: (_, __, context) => {
      return queryClient.setQueryData(
        todoListApi.getTodoListQueryOptions(user.data.id).queryKey,
        context?.previosData
      );
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [todoListApi.baseKey],
      });
    },
  });

  const toggleTodo = (id: string, completed: boolean) => {
    toggleTodoMutation.mutate({ completed: !completed, id });
  };

  return {
    toggleTodo,
  };
};
