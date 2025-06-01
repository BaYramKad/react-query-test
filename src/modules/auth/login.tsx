import { useAppDispath } from '../../shared/redux';
import { loginThunk } from './login-thunk';

export const Login = () => {
  const dispatch = useAppDispath();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const login = data.get('login')?.toString();
    const password = data.get('password')?.toString();
    if (login && password) {
      dispatch(loginThunk(login, password));
      return;
    }
    alert('Введите логин и пароль');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-[800px] mx-auto container mt-10 items-center border-2 border-gray-700 rounded-md"
    >
      <h1 className="mt-2 mb-4 font-bold text-2xl">Log in</h1>
      <label className="flex flex-col gap-2 mb-4">
        <input
          placeholder="login"
          className=" border-2 border-gray-700 rounded-md p-2 w-[400px]"
          type="text"
          name="login"
          id="login"
        />
        <input
          placeholder="password"
          className=" border-2 border-gray-700 rounded-md p-2 w-[400px]"
          type="number"
          name="password"
          id="password"
        />
      </label>
      <button className="bg-black text-white py-2 px-8 rounded-md mb-4 cursor-pointer hover:bg-sky-600">
        Войти
      </button>
    </form>
  );
};
