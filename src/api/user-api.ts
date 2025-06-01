import { queryOptions } from '@tanstack/react-query';
import type { UserDto } from '../shared/types/user-types';

import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

export const userApi = {
  baseKey: 'users',
  getUserById: (id: string) => {
    return queryOptions({
      queryKey: [userApi.baseKey, 'byId'],
      queryFn: async ({ signal }: { signal: AbortSignal }) => {
        const res = await axios.get<UserDto>(`${BASE_URL}/users/${id}`, {
          signal,
        });
        return res.data;
      },
    });
  },

  loginUser: ({ login, password }: { login: string; password: string }) => {
    return axios.get<UserDto[]>(
      `${BASE_URL}/users/?login=${login}&password=${password}`
    );
  },
};
