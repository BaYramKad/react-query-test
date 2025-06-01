import { Login } from '../modules/auth/login';
import { TodoList } from '../modules/todo-list/todo-list';
import { useUser } from '../shared/hooks/use-user';

export const App = () => {
  const user = useUser();

  if (user.isLoading) {
    return <h1>...Loading</h1>;
  }

  if (user.data) {
    return <TodoList />;
  }
  return <Login />;
};
