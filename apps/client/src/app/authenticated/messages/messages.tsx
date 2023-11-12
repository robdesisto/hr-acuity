import { Box, CircularProgress } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import styled from '@emotion/styled';

import { MessagesContext } from './massages.context';
import { loadMessages } from './massages.reducer';
import { MessageEditor } from './message-editor';
import { CreateMessage } from './create-message';
import { ErrorText } from '@hr-acuity/elements';
import { Message } from '@hr-acuity/ui/generated';
import { filterMessages } from './utils';

const Wrapper = styled(Box)`
  margin: 0 auto;
  max-width: 800px;
`;

const List = styled.ul`
  flex-grow: 1;
  list-style-type: none;
  margin: 0;
  padding: 0 0 1rem;
`;

const Item = styled.li`
  margin: 1rem 0;
`;

export function Messages() {
  const { state, dispatch } = useContext(MessagesContext);
  const [messages, setMessages ] = useState<Message[] | null>(null);

  useEffect(() => {
   void loadMessages(dispatch);
  }, [dispatch]);

  useEffect(() => {
    setMessages(filterMessages(state.messages, state.query));
  }, [state]);

  return (
    <Wrapper>
      { state.error && <ErrorText>{state.error}</ErrorText> }
      {
        !state.loading && !state.error && messages && (
          <>
            <CreateMessage />
            <List>
              {
                messages.length ?
                  messages.map(m => <Item key={m.id}><MessageEditor message={m} /></Item>) :
                  <Item>No messages to display</Item>
              }
            </List>
          </>
        )
      }
      { state.loading && <CircularProgress /> }
    </Wrapper>
  );
}
