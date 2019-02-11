// @flow

// $FlowFixMe
import React, { useState } from 'react';
import Button from 'app/components/Button';
import Input from 'app/components/Input';

type Props = {
  onSubmit: (username: string, password: string) => void
};

function LoginForm(props: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    props.onSubmit(username, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />

      <Input
        type="password"
        placeholder="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <Button type="submit" block>
        Login
      </Button>
    </form>
  );
}

export default LoginForm;
