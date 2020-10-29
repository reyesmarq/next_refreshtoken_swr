import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { getAccessToken } from '../utils/accessToken';
import { useUsersWithAuth } from '../utils/useUsersWithAuth';

const UsersWithAuth: React.FC = () => {
  let { data, isLoading, isError } = useUsersWithAuth();
  let router = useRouter();

  // If there is an accessToken
  useEffect(() => {
    if (!getAccessToken()) {
      router.push('/login')
    }
  }, []);

  if (isLoading) return <div>loading...</div>;
  if (isError) return <div>failed to load</div>;

  return (
    <ul>
      {data?.data?.map((user) => (
        <li key={user._id}>{user.email}</li>
      ))}
    </ul>
  );
};

export default UsersWithAuth;
