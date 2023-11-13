import { describe, expect } from 'vitest';

import { generateMessages } from '@hr-acuity/testing';

import { filterMessages } from './utils';

describe('filterMessages', () => {
  it('should filter the messages', () => {
    const message = { id: 10, message: 'I like orange soda' };
    const messages = [...generateMessages(2), message]
    expect(filterMessages(messages, 'soda').length).toBe(1);
  });
});
