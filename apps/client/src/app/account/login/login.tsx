import styled from '@emotion/styled';
import { Button, Card, CardActions, CardContent, CardHeader, Container, TextField } from '@mui/material';
import { FormEvent, useState } from 'react';

import { useAuth } from '@hr-acuity/ui/auth';
import { ErrorText } from '@hr-acuity/elements';

const Main = styled(Container)`
  align-items: center;
  display: flex;
  height: 100vh;
  justify-content: center;
`;

const Form = styled.form`
  width: 340px;
`;

const Input = styled(TextField)`
  width: 100%;
`;

export function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { error, login } = useAuth()

  async function handleLogin(e: FormEvent) {
    e.preventDefault();

    const validation: Record<string, string> = {};

    if (!username) {
      validation['username'] = 'Please enter a username';
    }

    if (!password) {
      validation['password'] = 'Please enter a password';
    }

    setErrors(validation);

    if (Object.keys(validation).length === 0) {
      await login({ username, password });
    }
  }

  return (
    <Main>
      <Form onSubmit={handleLogin}>
        <Card>
          <CardHeader title="Login" />
          <CardContent>
            <Input
              id='username'
              label='Username'
              variant='outlined'
              error={!!errors.username}
              value={username}
              helperText={errors.username}
              onChange={e => setUsername(e.target.value)}
            />
            <Input
              id='password'
              label='Password'
              variant='outlined'
              type="password"
              error={!!errors.password}
              value={password}
              helperText={errors.password}
              sx={{ mt: 3 }}
              onChange={e => setPassword(e.target.value)}
            />
          </CardContent>
          <CardActions>
            <Button color="primary" type="submit">
              Login
            </Button>
            { error && <ErrorText>{error}</ErrorText> }
          </CardActions>
        </Card>
      </Form>
    </Main>
  );
}
