import { useUser } from '../../shared/hooks/use-user';
import { useAppDispath } from '../../shared/redux';
import { logoutThunk } from './logout-thunk';

export const LogoutButton = () => {
  const dispatch = useAppDispath();
  const queryUser = useUser();
  return (
    <div className="flex items-center gap-3">
      <span className="font-medium">{queryUser.data?.login}</span>
      <button
        onClick={() => dispatch(logoutThunk())}
        className="self-end bg-gray-900 hover:bg-gray-950 transition text-[12px] text-white font-bold py-1 px-5 rounded-md cursor-pointer"
      >
        Log out
      </button>
    </div>
  );
};
