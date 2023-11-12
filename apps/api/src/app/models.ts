import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty()
  username: string;

  @ApiProperty()
  token: string;
}

export class Login {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}
