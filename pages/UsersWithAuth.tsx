import React from 'react';
import { useUsersWithAuth } from '../utils/useUsersWithAuth';

const UsersWithAuth: React.FC = () => {
  // console.log('accessToken usersWithAuth', getAccessToken());
  // console.log(axios.defaults.headers.authorization)

  let { data, isLoading, isError } = useUsersWithAuth();

  if (isLoading) return <div>loading...</div>;
  if (isError) return <div>failed to load</div>;

  return (
    <ul>
      {data?.data.map((user) => (
        <li key={user._id}>{user.email}</li>
      ))}
    </ul>
  );
};

export default UsersWithAuth;
