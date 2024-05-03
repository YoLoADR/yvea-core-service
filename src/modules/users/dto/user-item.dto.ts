import { CompanyDto } from '@modules/companies/dto';
import { SubscriptionDto } from '@modules/subscriptions/dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { User } from '../entities';

export class UserDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  firstName?: string;

  @ApiProperty()
  lastName?: string;

  @ApiPropertyOptional()
  phone?: string;

  @ApiProperty()
  company?: CompanyDto;

  @ApiPropertyOptional({ type: [SubscriptionDto] })
  subscriptions?: SubscriptionDto[];


  constructor(entity: User) {
    this.id = entity.id;
    this.email = entity.email;
    this.firstName = entity.firstName;
    this.lastName = entity.lastName;
    this.phone = entity.phone ?? undefined;
    this.company = entity.company ? new CompanyDto(entity.company) : undefined;
    this.subscriptions = entity.subscriptions?.map(sub => new SubscriptionDto(sub));
  }
}
