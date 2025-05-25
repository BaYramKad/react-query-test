import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query';
import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

export type TaskDto = {
  id: number;
  title: string;
  completed: boolean;
};

type PaginatedTodoList<T> = {
  data: T[];
  first: number;
  items: number;
  last: number;
  next: number;
  pages: number;
  prev: number;
};

export const todoListApi = {
  getTodoList: async ({ page }: { page: number }, { signal }: { signal: AbortSignal }) => {
    const todos = await axios.get<PaginatedTodoList<TaskDto>>(`${BASE_URL}/tasks?_page=${page}&_per_page=10`, { signal });
    return todos.data;
  },

  createTodo: (newTask: TaskDto) => {
    return axios.post<TaskDto>(`${BASE_URL}/tasks`, {
      ...newTask,
    });
  },

  updataTodo: (task: TaskDto) => {
    return axios.patch<TaskDto>(`${BASE_URL}/tasks/${task.id}`, {
      ...task,
    });
  },

  deleteTodo: (taskId: number) => {
    return axios.delete(`${BASE_URL}/tasks/${taskId}`);
  },

  getTodoLostQueryOptions: ({ page }: { page: number }) => {
    return queryOptions({
      queryKey: ['tasks', 'infinity-tasks', page], // Ключ запроса, который будет использоваться для кэширования и синхронизации данных.
      queryFn: (meta) => todoListApi.getTodoList({ page }, meta),
    });
  },
  getTodoListInfinityQueryOptions: () => {
    return infiniteQueryOptions({
      queryKey: ['tasks', 'infinity-tasks'], // Ключ запроса, который будет использоваться для кэширования и синхронизации данных.
      queryFn: (meta) => todoListApi.getTodoList({ page: meta.pageParam }, meta),
      initialPageParam: 1,
      getNextPageParam: (latePage) => latePage.next, // Функция для получения следующей страницы. Она будет вызвана, когда будет выполнен запрос на следующую страницу.
      select: (data) => data.pages.flatMap((page) => page.data), // Функция для преобразования данных перед их использованием. Она будет вызвана, когда данные будут получены.
      // placeholderData: keepPreviousData, // Это свойство указывает, что предыдущие данные будут использоваться в качестве временных данных до получения новых данных.
      // enabled: enabled, // Это свойство указывает, что запрос будет выполнен только в том случае, если оно истинно. Для ленивых запросов.
      // staleTime: 1000 * 60 * 1, // Время, в течение которого данные считаются свежими (в миллисекундах).
      // initialData: // Это начальные данные, которые будут отображаться до получения данных.
    });
  },
};
