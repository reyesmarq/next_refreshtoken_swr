import useSWR from 'swr';
import { getAccessToken } from './accessToken';

const useUsersWithAuth = () => {
  console.log('getAccessToken()', getAccessToken());
  const { data, error, mutate } = useSWR([
    '/api/users',
    getAccessToken(),
    'get',
  ]);

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};

export { useUsersWithAuth };

