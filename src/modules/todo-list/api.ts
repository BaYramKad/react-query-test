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
    return await fetch(`${BASE_URL}/tasks?_page=${page}&_per_page=10`, {
      signal,
    }).then((response) => response.json() as Promise<PaginatedTodoList<TaskDto>>);
  },
};
