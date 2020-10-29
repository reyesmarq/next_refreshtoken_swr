import useSWR from 'swr';
import { getAccessToken } from './accessToken';

const useUsers = () => {
  console.log('accesstoken', getAccessToken());
  const { data, error } = useSWR([
    '/api/users/usersNoAuth',
    getAccessToken(),
    'get',
  ]);

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export { useUsers };

