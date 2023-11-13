import { Dispatch } from 'react';
import { beforeEach, describe, expect } from 'vitest';

import { MockHttp, mockMessage } from '@hr-acuity/testing';
import { Http } from '@hr-acuity/ui/http';

import { createMessage, InitialMessageState, MessagesReducer } from './messages.reducer';
import { MessageAction, MessageState } from './types';
vi.mock('@hr-acuity/ui/http', () => {
  return {
    Http: new MockHttp(),
  }
});

describe('MessagesReducer', () => {
  let state: MessageState;

  beforeEach(() => {
    state = InitialMessageState;
  });

  it('should throw if given a non-existent type', () => {
    expect(() => MessagesReducer(state, { type: 'absurdities', payload: null })).toThrow();
  });

  it('should add a message', () => {
    const updated = MessagesReducer(state, { type: 'add', payload: mockMessage() });
    expect(updated.messages.length).toBe(1);
  });

  it('should update the error', () => {
    const payload = 'Loud noises!';
    const updated = MessagesReducer(state, { type: 'error', payload });
    expect(updated.error).toBe(payload);
  });

  it('should add a filter', () => {
    const payload = 'abc';
    const updated = MessagesReducer(state, { type: 'filter', payload });
    expect(updated.query).toBe(payload);
  });

  // ...and so on
});

describe('createMessage', async () => {
  let dispatch: Dispatch<MessageAction>;

  beforeEach(() => {
    dispatch = vi.fn();
  });

  it('should create a message and then dispatch an action', async () => {
    const data = mockMessage();
    vi.mocked(Http).instance.post = vi.fn(async () => ({ data })) as any;
    await createMessage(data.message, dispatch);
    expect(dispatch).toHaveBeenCalled();
  });
});
