import { useUsers } from '../utils/useUsers';

interface Props {}

const Users: React.FC<Props> = () => {
  let { data, isLoading, isError } = useUsers();

  console.log(data?.data);

  if (isLoading) return <div>loading...</div>;
  if (isError) return <div>failed to load</div>;

  return (
    <ul>
      {data?.data.map((user) => (
        <li key={user.id}>{user.email}</li>
      ))}
    </ul>
  );
};

export default Users;
