import { Module } from '@nestjs/common';

import { MessagesController } from './messges.controller';

@Module({
  controllers: [MessagesController]
})
export class MessagesModule {}
