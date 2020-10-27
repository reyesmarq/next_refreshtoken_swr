import axios from 'axios';
import useSWR from 'swr';

const useUsersWithAuth = () => {
  const { data, error } = useSWR('/api/users', (url: string) =>
    axios(url).then((r) => r.data)
  );

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export { useUsersWithAuth };

