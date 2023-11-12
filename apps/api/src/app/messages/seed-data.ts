import { faker } from '@faker-js/faker';

import { Message } from './models';

/**
 * Mashing up some hard coded fake data so that I can reliably test out filtering,
 * but using the excellent mocking library faker to add some arbitrary content so that
 * messages will be different lengths.
 */
export const Messages: Message[] = [
  {
    id: 1,
    message: `This is message one. Oh, what fun. ${faker.lorem.sentences()}`
  },
  {
    id: 2,
    message: `This is message two. The cow goes moo. ${faker.lorem.sentences()}`
  },
  {
    id: 3,
    message: `This is message three. What a treat for me! ${faker.lorem.sentences()}`
  },
  {
    id: 4,
    message: `This is message four. Who could ask for more?! ${faker.lorem.sentences()}`
  },
  {
    id: 5,
    message: `This is message five. What a time to be alive. ${faker.lorem.sentences()}`
  },
  {
    id: 6,
    message: `This is message six. Pick up sticks. ${faker.lorem.sentences()}`
  },
  {
    id: 7,
    message: `This is message seven. It doesn't rhyme even. ${faker.lorem.sentences()}`
  },
  {
    id: 8,
    message: `This is message eight. Don't be late! ${faker.lorem.sentences()}`
  },
  {
    id: 9,
    message: `This is message nine. Feeling fine. ${faker.lorem.sentences()}`
  },
  {
    id: 10,
    message: `This is message ten. You have reached the end. ${faker.lorem.sentences()}`
  }
].reverse();
