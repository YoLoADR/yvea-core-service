import { ApiProperty } from '@nestjs/swagger';
import { CompanyType } from '../entities';

export class CompanyTypeDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  constructor(entity: CompanyType) {
    this.id = entity.id;
    this.name = entity.nameFr || entity.nameEn;
  }
}
