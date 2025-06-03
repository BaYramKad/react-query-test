import { LogoutButton } from './auth/logoutButton';

export const Header = () => {
  return (
    <div className="flex justify-between items-center p-3 w-full">
      <h1 className="text-1xl font-bold">Todo List</h1>

      <LogoutButton />
    </div>
  );
};
