import axios from 'axios';
import useSWR from 'swr';

const useUsers = () => {
  const { data, error } = useSWR(
    'http://localhost:3000/api/users/usersNoAuth',
    (url: string) => axios(url).then((r) => r.data)
  );

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export { useUsers };

