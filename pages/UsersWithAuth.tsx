import React from 'react';
import { getAccessToken } from '../utils/accessToken';
import { useUsersWithAuth } from '../utils/useUsersWithAuth';

const UsersWithAuth: React.FC = () => {
  let { data, isLoading, isError } = useUsersWithAuth();

  console.log('access token userwithauth', getAccessToken())

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
