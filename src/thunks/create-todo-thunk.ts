import { MutationObserver, useMutation } from '@tanstack/react-query';
import { todoListApi } from '../api/todo-list-api';
import type { AppThunk } from '../shared/redux';
import { queryClient } from '../shared/ui/query-client';
import { nanoid } from 'nanoid';
import type { TaskDto } from '../shared/types/todo-types';
import { AuthSlice } from '../modules/auth/auth.slice';
import { userApi } from '../api/user-api';

export const createTodoThunk =
  (text: string): AppThunk =>
  async (_, getState) => {
    const userId = AuthSlice.selectors.getUserId(getState());
    if (!userId) throw Error('user is not login');
    const user = await queryClient.fetchQuery(userApi.getUserById(userId));

    const newTodo: TaskDto = {
      id: nanoid(),
      completed: false,
      title: text + ` Owner- ${user.login}`,
      userId,
    };

    queryClient.cancelQueries({
      queryKey: [todoListApi.baseKey],
    });

    const queryKeyOptions =
      todoListApi.getTodoListQueryOptions(userId).queryKey;

    queryClient.setQueryData(queryKeyOptions, (todos) => [
      ...(todos ?? []),
      newTodo,
    ]);

    const previousTodos = queryClient.getQueryData(queryKeyOptions);

    try {
      await new MutationObserver(queryClient, {
        mutationKey: ['create-todo'],
        mutationFn: todoListApi.createTodo,
      }).mutate(newTodo);
    } catch {
      queryClient.setQueryData(queryKeyOptions, previousTodos);
    } finally {
      queryClient.invalidateQueries({
        queryKey: [todoListApi.baseKey],
      });
    }
  };

export const useCreateTodoLoading = () =>
  useMutation({
    mutationKey: ['create-todo'],
  }).isPending;
