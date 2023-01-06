import { ApiProperty } from '@nestjs/swagger';

export class UserCredentialsDTO {
  @ApiProperty()
  username: string;
  @ApiProperty()
  password: string;
}
