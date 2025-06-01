import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { rootReducer } from '../../shared/redux';

type AuthState = {
  userId: string | undefined;
  loginErorr: string | undefined;
};

export const AuthSlice = createSlice({
  name: 'auth',
  initialState: {
    userId: localStorage.getItem('userId'),
  } as AuthState,
  reducers: {
    addUserId(state, action: PayloadAction<{ id: string }>) {
      state.userId = action.payload.id;
    },
    removeUserId(state) {
      state.userId = undefined;
    },
    setLoginError(state, action: PayloadAction<string>) {
      state.loginErorr = action.payload;
    },
  },

  selectors: {
    getUserId: (state) => state.userId,
    getLoginErorr: (state) => state.loginErorr,
  },
}).injectInto(rootReducer);
