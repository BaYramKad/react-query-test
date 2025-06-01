import { MutationObserver } from '@tanstack/react-query';
import type { AppThunk } from '../../shared/redux';

export const loginThunk =
  (login: string, password: string): AppThunk =>
  (dispatch, getState) => {};
