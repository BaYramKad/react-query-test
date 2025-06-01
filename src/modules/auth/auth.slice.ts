import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { rootReducer } from '../../shared/redux';

type AuthState = {
  userId: string | undefined;
};

export const AuthSlice = createSlice({
  name: 'auth',
  initialState: {
    userId: undefined,
  } as AuthState,
  reducers: {
    addUserId(state, action: PayloadAction<{ id: string }>) {
      state.userId = action.payload.id;
    },
    removeUserId(state) {
      state.userId = undefined;
    },
  },

  selectors: {
    getUserId: (state) => state.userId,
  },
}).injectInto(rootReducer);
