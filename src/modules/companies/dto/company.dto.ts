import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Company } from '../entities';

export class CompanyDto {
  @ApiProperty()
  name: string;

  @ApiPropertyOptional()
  fiscalNumber?: string;

  @ApiProperty()
  street: string;

  @ApiProperty()
  postalCode: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  country: string;

  @ApiProperty()
  type: string;

  constructor(entity: Company) {
    this.name = entity.name;
    this.fiscalNumber = entity.fiscalNumber ?? undefined;
    this.street = entity.street;
    this.postalCode = entity.postalCode;
    this.city = entity.city;
    this.country = entity.country;
    this.type = entity.typeId;
  }
}
