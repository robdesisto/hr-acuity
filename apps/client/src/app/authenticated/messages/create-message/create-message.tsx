import styled from '@emotion/styled';
import { Icon, IconButton } from '@mui/material';
import { FormEvent, useContext, useState } from 'react';

import { Textarea } from '@hr-acuity/elements';

import { MessagesContext } from '../massages.context';
import { createMessage } from '../messages.reducer';

const Form = styled.form`
  position: relative;
  padding: 2rem 0 0.5rem;
`;

const Submit = styled(IconButton)`
  margin: 2px 2px 0 0;
  position: absolute;
  right: 0;
  top: 1.5rem;
`;

export function CreateMessage() {
  const [message, setMessage] = useState<string>('');
  const { dispatch } = useContext(MessagesContext);

  function create(e: FormEvent) {
    e.preventDefault();

    void createMessage(message, dispatch)
    setMessage('');
  }

  return (
    <Form id="create-message" onSubmit={create}>
      <Textarea
        aria-label="Enter a message"
        minRows={2}
        maxRows={6}
        sx={{ pr: 7 }}
        placeholder="Your message..."
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <Submit
        size="large"
        title="Post"
        color="inherit"
        type="submit"
        disabled={!message}
      >
        <Icon>send</Icon>
      </Submit>
    </Form>
  );
}
