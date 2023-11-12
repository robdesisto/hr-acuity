import { ApiProperty } from '@nestjs/swagger';

export class Message {
  @ApiProperty()
  id: number;

  @ApiProperty()
  message: string;
}

export class CreateMessage {
  @ApiProperty()
  message: string;
}

export class UpdateMessage extends CreateMessage {}

export class DeleteResponse {
  @ApiProperty()
  id: number;
}
