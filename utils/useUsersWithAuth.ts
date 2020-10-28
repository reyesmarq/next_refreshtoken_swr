import axios from 'axios';
import useSWR from 'swr';

const useUsersWithAuth = () => {
  console.log(
    'defaults.headers.authorization',
    axios.defaults.headers.authorization
  );

  const { data, error, mutate } = useSWR('/api/users', (url: string) =>
    // axios(url, {
    //   headers: {
    //     Authorization: `bearer ${getAccessToken()}`,
    //   },
    // }).then((r) => r.data)
    axios(url).then((r) => r.data)
  );

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};

export { useUsersWithAuth };

