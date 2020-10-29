import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getAccessToken, setAccessToken } from '../utils/accessToken';

interface Props {}

const login: React.FC<Props> = () => {
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let router = useRouter();
  let token = getAccessToken();

  // If there is an accessToken
  useEffect(() => {
    if (token) {
      router.push('/UsersWithAuth');
    }
  }, [token]);

  // TODO: needs to be moved to the utils folder
  const handleLogin = async ({ email, password }) => {
    try {
      let data = await axios
        .post('/api/users/login', {
          email,
          password,
        })
        .then((res) => res.data);

      setAccessToken(data.data);
      router.push('/UsersWithAuth');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (email && password) {
          handleLogin({ email, password });
        }

        setEmail('');
        setPassword('');
      }}
    >
      <div>
        <input
          type="text"
          value={email}
          placeholder="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>
      <div>
        <input
          type="password"
          value={password}
          placeholder="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );
};

export default login;
