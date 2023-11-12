import { Dispatch } from 'react';

import { Message } from '@hr-acuity/ui/generated';
import { Http } from '@hr-acuity/ui/http';
import { asyncConfirm } from '@hr-acuity/ui/utils';

import { MessageAction, MessageState } from './types'

export const InitialMessageState: MessageState = {
  error: '',
  loading: false,
  query: '',
  messages: []
};

export const MessageHandlers: Record<string, (state: MessageState, action: MessageAction) => MessageState> = {
  add(state: MessageState, { payload }: MessageAction<Message>) {
    const messages = [payload, ...state.messages];
    return { ...state, messages };
  },
  error(state: MessageState, { payload }: MessageAction<string>) {
    return { ...state, error: payload };
  },
  filter(state: MessageState, { payload }: MessageAction<string>) {
    return { ...state, query:  payload };
  },
  hydrate(state: MessageState, { payload }: MessageAction<Message[]>) {
    return { ...state, messages: payload };
  },
  loading(state: MessageState, { payload}: MessageAction<boolean>) {
    return { ...state, loading: payload };
  },
  remove(state: MessageState, { payload }: MessageAction<number>) {
    const messages = state.messages.filter(m => m.id !== payload);
    return { ...state, messages };
  },
  update(state: MessageState, { payload }: MessageAction<Message>) {
    const messages = state.messages;
    const index = messages.findIndex(m => m.id === payload.id);
    messages[index] = payload;

    return { ...state, messages: [...messages] };
  }
}

export function MessagesReducer(state: MessageState, action: MessageAction) {
  if (!MessageHandlers[action.type]) {
    throw Error(`No handler for ${action.type}`);
  }

  return MessageHandlers[action.type as string](state, action);
}

export async function loadMessages(dispatch: Dispatch<MessageAction>) {
  dispatch({ type: 'loading', payload: true });

  try {
    const { data } = await Http.instance.get('/api/messages');
    dispatch({ type: 'hydrate', payload: data } )
  } catch {
    dispatch({ type: 'hydrate', payload: [] } );
    dispatch({ type: 'error', payload: 'Unable to load messages' });
  } finally {
    dispatch({ type: 'loading', payload: false });
  }
}

export async function createMessage(message: string, dispatch: Dispatch<MessageAction>) {
  // Clear the filter so that the created message doesn't get filtered out
  dispatch({ type: 'filter', payload: '' });
  const { data } = await Http.instance.post('/api/messages', { message });
  dispatch({ type: 'add', payload: data });
}

export async function updateMessage(id: number, message: string, dispatch: Dispatch<MessageAction>) {
  const { data } = await Http.instance.patch(`/api/messages/${id}`, { message });
  dispatch({ type: 'update', payload: data });
}

export async function deleteMessage(id: number, dispatch: Dispatch<MessageAction>) {
  const confirmed = await asyncConfirm('Delete this message?');

  if (confirmed) {
    await Http.instance.delete(`/api/messages/${id}`);
    dispatch({ type: 'remove', payload: id });
  }
}
