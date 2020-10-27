import axios from 'axios';
import useSWR from 'swr';

const useHello = () => {
  const { data, error } = useSWR(
    '/api/test',
    (url: string) => axios(url).then((r) => r.data)
  );

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export { useHello };

