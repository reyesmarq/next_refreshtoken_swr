import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';

interface Props {}

const register: React.FC<Props> = () => {
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');

  let router = useRouter()

  // TODO: needs to be moved to the utils folder
  const handleRegister = async ({ email, password }) => {
    try {
      let data = await axios
        .post('http://localhost:3000/api/users/register', {
          email,
          password,
        })
        .then((res) => res.data);

      router.push('/')
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (email && password) {
          handleRegister({ email, password });
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
      <button type="submit">Register</button>
    </form>
  );
};

export default register;
