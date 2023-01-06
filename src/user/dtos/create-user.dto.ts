import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/auth/enums/role.enum';

export class CreateUserDTO {
  @ApiProperty()
  username: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
  @ApiProperty({
    isArray: true,
    enum: Role,
  })
  roles: Role[];
}
