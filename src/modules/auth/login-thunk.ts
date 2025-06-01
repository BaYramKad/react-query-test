import { MutationObserver, useMutation } from '@tanstack/react-query';
import type { AppThunk } from '../../shared/redux';
import { queryClient } from '../../shared/ui/query-client';
import { userApi } from '../../api/user-api';
import { AuthSlice } from './auth.slice';

export const loginThunk =
  (login: string, password: string): AppThunk =>
  async (dispatch) => {
    const user = await new MutationObserver(queryClient, {
      mutationKey: ['login'],
      mutationFn: userApi.loginUser,
    }).mutate({ login, password });

    if (user) {
      dispatch(AuthSlice.actions.addUserId({ id: user.id }));
      queryClient.setQueryData(userApi.getUserById(user.id).queryKey, user);
      localStorage.setItem('userId', user.id);
    } else {
      dispatch(AuthSlice.actions.setLoginError('Не удалось Войти'));
    }
  };

export const useLoginLoading = () =>
  useMutation({
    mutationKey: ['login'],
  }).isPending;
