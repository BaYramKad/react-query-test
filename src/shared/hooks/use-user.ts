import { useQuery } from '@tanstack/react-query';
import { userApi } from '../../api/user-api';
import { useAppSelector } from '../redux';
import { AuthSlice } from '../../modules/auth/auth.slice';

export const useUser = () => {
  const userId = useAppSelector(AuthSlice.selectors.getUserId);
  return useQuery({
    ...userApi.getUserById(userId!),
    enabled: !!userId,
  });
};
