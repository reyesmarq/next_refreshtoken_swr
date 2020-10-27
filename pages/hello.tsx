import { useHello } from '../utils/useHello';

const index: React.FC = () => {
  let { data, isLoading, isError } = useHello();

  if (isLoading) return <div>loading...</div>;
  if (isError) return <div>failed to load</div>;

  return <div>{data?.msg}</div>;
};

export default index;
