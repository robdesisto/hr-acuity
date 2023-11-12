import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { CreateMessage, Message, UpdateMessage } from './models';
import { Messages } from './seed-data';

let messageId = 11;

@ApiTags('Messages')
@Controller('messages')
export class MessagesController {
  private messages: Message[];

  constructor() {
    this.messages = Messages;
  }

  @ApiOkResponse({ description: 'Get all messages', type: Message, isArray: true })
  @Get()
  findAll() {
    return this.messages;
  }

  @ApiOkResponse({ description: 'Create a message', type: Message })
  @Post()
  create(@Body() message: CreateMessage) {
    const created  =  { ...message, id: messageId++ };
    this.messages.unshift(created);
    return created;
  }

  @ApiOkResponse({ description: 'Update a message', type: Message })
  @Patch(':id')
  update(@Param('id') id: string, @Body()  { message }: UpdateMessage) {
    const index = this.messages.findIndex(m => m.id === parseInt(id));
    this.messages[index].message = message;
    return this.messages[index];
  }

  @ApiOkResponse({ description: 'Delete a message', type: Message })
  @Delete(':id')
  remove(@Param('id') id: string) {
    this.messages = this.messages.filter(m => m.id !== parseInt(id));
  }
}
