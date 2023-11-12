import { Message } from '@hr-acuity/ui/generated';

export type MessageState = {
  error: string;
  loading: boolean;
  messages: Message[];
  query: string;
}

export type MessageAction<T = any> = {
  type: string;
  payload: T;
}
