import { faker } from '@faker-js/faker';

import { Message, User } from '@hr-acuity/ui/generated';

export function mockUser(): User {
  return {
    username: faker.internet.email(),
    token: faker.lorem.slug()
  }
}

let messageId = 0;
export function mockMessage(): Message {
  return {
    id: messageId++,
    message: `Message ${messageId} ${faker.lorem.sentences()}`
  }
}

export function generateMessages(count = 1): Message[] {
  return forCount<Message>(mockMessage, count);
}

function forCount<T>(generator: () => T, count: number): T[] {
  const items: T[] = [];
  for (let i = 0; i < count; i++) {
    items.push(generator());
  }
  return items;
}

export class MockHttp {
  get instance() {
    return this._instance;
  }

  _instance = {
    async get() {/* NOOP */},
    async post() {/* NOOP */}
  }
}
