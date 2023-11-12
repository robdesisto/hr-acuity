import styled from '@emotion/styled';
import { Box, Icon, IconButton } from '@mui/material';
import { useCallback, useContext, useState } from 'react';

import { Textarea } from '@hr-acuity/elements';
import { Message } from '@hr-acuity/ui/generated';

import { MessagesContext } from '../massages.context';
import { deleteMessage, updateMessage } from '../massages.reducer';

type MessageProps = {
  message: Message;
}

const Controls = styled.div`
  position: absolute;
  right: 2px;
  top: 2px;
`;

const Form = styled.form`
  position: relative;
`;

const actionsPadding = '104px';

export function MessageEditor({ message }: MessageProps) {
  const { dispatch } = useContext(MessagesContext);
  const [editing, setEditing] = useState(false);
  const [update, setUpdate] = useState(message.message);

  const removeCb = useCallback(() => {
    void deleteMessage(message.id, dispatch);
  }, [message, dispatch]);

  const updateCb = useCallback(() => {
    void updateMessage(message.id, update, dispatch);
    setEditing(false);
  }, [message, update, dispatch]);

  return (
    editing ?
      <Form>
        <Textarea
          aria-label="Enter a message"
          minRows={2}
          maxRows={6}
          sx={{ paddingRight: actionsPadding }}
          placeholder="Your message..."
          value={update}
          onChange={e => setUpdate(e.target.value)}
        />
        <Controls>
          <IconButton
            size="large"
            color="inherit"
            onClick={() => setEditing(false)}
          >
            <Icon>clear</Icon>
          </IconButton>
          <IconButton
            disabled={!update}
            size="large"
            color="inherit"
            onClick={updateCb}
          >
            <Icon>send</Icon>
          </IconButton>
        </Controls>
      </Form>
    :
        <Box
          sx={{
            boxShadow: 1,
            border: 1,
            borderRadius: 2,
            p: 2,
            paddingRight: actionsPadding,
            position: 'relative'
          }}
        >
          {message.message}
          <Controls>
            <IconButton
              size="large"
              color="inherit"
              onClick={() => setEditing(true)}
            >
              <Icon>edit</Icon>
            </IconButton>
            <IconButton
              size="large"
              color="inherit"
              onClick={removeCb}
            >
              <Icon>delete</Icon>
            </IconButton>
          </Controls>
        </Box>

  );
}
