import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../shared/ui/query-client';
import { TodoList } from '../modules/todo-list/todo-list';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TodoList />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
