import { Message } from '@hr-acuity/ui/generated';

/**
 * Really try to keep functionality out of the components so that it is actually unit-testable.
 */
export function filterMessages(messages: Message[], query: string): Message[] {
  return  query ? messages.filter(m => m.message.toLowerCase().includes(query)) : messages;
}
