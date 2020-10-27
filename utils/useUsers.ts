import axios from 'axios';
import useSWR from 'swr';

const useUsers = () => {
  const { data, error } = useSWR('/api/users/usersNoAuth', (url: string) =>
    axios(url).then((r) => r.data)
  );

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export { useUsers };

