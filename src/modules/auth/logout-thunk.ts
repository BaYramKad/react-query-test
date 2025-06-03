import type { AppThunk } from '../../shared/redux';
import { queryClient } from '../../shared/ui/query-client';
import { AuthSlice } from './auth.slice';

export const logoutThunk = (): AppThunk => async (dispatch) => {
  dispatch(AuthSlice.actions.removeUserId());
  queryClient.removeQueries();
  localStorage.removeItem('userId');
};
