import { createContext, Dispatch } from 'react';

import { MessageAction, MessageState } from './types';
import { InitialMessageState } from './messages.reducer';

type MessagesContextProps = {
  dispatch: Dispatch<MessageAction>
  state: MessageState;
}

const initialState = {
  dispatch: () => { /* NOOP */ },
  state: InitialMessageState
}

export const MessagesContext = createContext<MessagesContextProps>(initialState);
