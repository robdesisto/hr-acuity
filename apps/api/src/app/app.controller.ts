import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';

import { Login, User } from './models';


/**
 * Normally I'd follow Nest best practices with an emphasis on single responsibility,
 * use an ORM like TypeORM, and good us of services and DI, but it's a bit much for this.
 *
 * All I really want out of this is 1. a mock API and 2. types, so everything is just
 * going in controllers.
 */
@Controller()
export class AppController {

  @Get('')
  getData() {
    return 'App is live.'
  }

  @ApiOkResponse({ description: 'Mock login', type: User })
  @Post('/login')
  login(@Body() { username }: Login) {
    return { username, token: 'not-a-real-jaydoubleutee' };
  }
}
