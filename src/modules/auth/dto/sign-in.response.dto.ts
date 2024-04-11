import { User } from '@modules/users/entities';
import { ApiProperty } from '@nestjs/swagger';

export class SignInResponseDto {
  @ApiProperty()
  role: string;

  constructor(entity: User) {
    this.role = entity.roleId;
  }
}
