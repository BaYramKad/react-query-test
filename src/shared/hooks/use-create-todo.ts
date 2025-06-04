import {
  createTodoThunk,
  useCreateTodoLoading,
} from '../../thunks/create-todo-thunk';
import { useAppDispath } from '../redux';

export const useCreateTodo = () => {
  const createDispatch = useAppDispath();
  const createTodoLoading = useCreateTodoLoading();
  const createTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const text = String(new FormData(event.currentTarget).get('text'));
    if (!text.length) {
      alert('Please Enter the text');
      return;
    }

    createDispatch(createTodoThunk(text));

    event.currentTarget.reset();
  };

  return {
    createTodo,
    createTodoLoading,
  };
};
