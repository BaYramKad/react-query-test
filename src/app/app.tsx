import { Login } from '../modules/auth/login';
import { Header } from '../modules/header';
import { TodoList } from '../modules/todo-list/todo-list';
import { useUser } from '../shared/hooks/use-user';

export const App = () => {
  const user = useUser();

  if (user.isLoading) {
    return <h1>...Loading</h1>;
  }

  if (user.data) {
    return (
      <div className="bg-blue-200 h-screen flex items-center flex-col">
        <Header />
        <TodoList />
      </div>
    );
  }
  return (
    <div className="h-screen flex items-center bg-blue-200">
      <Login />
    </div>
  );
};
