import { useState } from 'react';

interface Props {}

const register: React.FC<Props> = () => {
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        console.log('form submitted');
        console.log('email value', email);
        console.log('password value', password);
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
