import { useAppDispath, useAppSelector } from '../../shared/redux';
import { AuthSlice } from './auth.slice';
import { loginThunk, useLoginLoading } from './login-thunk';

export const Login = () => {
  const isLoading = useLoginLoading();
  const dispatch = useAppDispath();
  const loginError = useAppSelector(AuthSlice.selectors.getLoginErorr);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const login = data.get('login')?.toString();
    const password = data.get('password')?.toString();
    if (login && password) {
      dispatch(loginThunk(login, password));
      event.currentTarget.reset();
      return;
    }
    alert('Введите логин и пароль');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-center gap-3 text-white w-[500px] h-[300px] mx-auto container items-center bg-stone-700 rounded-2xl"
    >
      <h1 className="mt-2 mb-4 font-black text-2xl">Log in</h1>
      <label className="flex flex-col gap-2 mb-4">
        <input
          placeholder="login"
          className="border-b-amber-50 border-x-0 border-t-0 outline-0 text-white border-2 p-2 w-[400px]"
          type="text"
          name="login"
          id="login"
        />
        <input
          placeholder="password"
          className="appearance-none border-b-amber-50 border-x-0 border-t-0 outline-0 text-white border-2 p-2 w-[400px]"
          type="number"
          name="password"
          id="password"
        />
      </label>
      <button
        className={`bg-blue-100 hover:bg-blue-200 transition text-black font-bold py-2 px-8 rounded-md mb-2 cursor-pointer`}
      >
        Войти
      </button>
      {isLoading && (
        <span className="text-orange-500 font-bold">...Loading</span>
      )}

      {loginError && (
        <span className="text-orange-500 font-bold">{loginError}</span>
      )}
    </form>
  );
};
