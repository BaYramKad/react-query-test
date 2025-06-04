import { queryOptions } from '@tanstack/react-query';
import type { TaskDto } from '../shared/types/todo-types';

import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

export const todoListApi = {
  baseKey: 'tasks',
  createTodo: (newTask: TaskDto) => {
    return axios.post<TaskDto>(`${BASE_URL}/tasks`, newTask);
  },

  toggleTodo: (task: Partial<TaskDto> & { id: string }) => {
    return axios.patch<TaskDto>(`${BASE_URL}/tasks/${task.id}`, task);
  },

  deleteTodo: (taskId: string) => {
    return axios.delete(`${BASE_URL}/tasks/${taskId}`);
  },

  getTodoListQueryOptions: (userId: string) => {
    return queryOptions({
      queryKey: [todoListApi.baseKey, 'list', userId], // Ключ запроса, который будет использоваться для кэширования и синхронизации данных.
      queryFn: async () => {
        const result = await axios.get<TaskDto[]>(
          `${BASE_URL}/tasks?userId=${userId}`
        );
        return result.data;
      },
    });
  },
};
