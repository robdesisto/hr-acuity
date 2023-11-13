import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect } from 'vitest';

import { TestingProviders } from '@hr-acuity/testing';

import { createMessage, InitialMessageState } from '../messages.reducer';
import { MessagesContext } from '../massages.context';
import { CreateMessage } from './create-message';
import { act } from 'react-dom/test-utils';

vi.mock('../messages.reducer', async (importOriginal) => {
  const mod = await importOriginal() as any
  return {
    ...mod,
    // replace some exports
    createMessage: vi.fn(async () => { /* NOOP */ }),
  }
});

const dispatch = () => { /* NOOP */}

describe('CreateMessage', () => {
  beforeEach(() => {
    render(
      <TestingProviders>
        <MessagesContext.Provider value={{ state: InitialMessageState, dispatch }}>
          <CreateMessage />
        </MessagesContext.Provider>
      </TestingProviders>
    );
  });

  it('should clear its value after submission', async () => {
    const input = await screen.findByPlaceholderText('Your message...') as HTMLTextAreaElement;
    const value = 'A new message';

    await act(async () => {
      fireEvent.change(input, { target: { value }});

      const button = await screen.findByRole('button');
      button.click();
    });

    expect(vi.mocked(createMessage)).toHaveBeenCalledWith(value, dispatch);
    expect(input.value).toBe('');
  });
});
