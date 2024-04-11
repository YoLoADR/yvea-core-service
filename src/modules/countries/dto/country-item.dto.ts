import { ApiProperty } from '@nestjs/swagger';
import { Country } from '../entities';

export class CountryItemDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  constructor(entity: Country) {
    this.id = entity.id;
    this.name = entity.nameFr || entity.nameEn;
  }
}
