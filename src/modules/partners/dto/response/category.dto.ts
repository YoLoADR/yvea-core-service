import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PartnerDto } from '..';
import { Category } from '../../entities';

export class CategoryDto {
  @ApiProperty({ example: 'DIGITAL_SOLUTIONS' })
  id: string;

  @ApiProperty({ example: 'Digital Solutions' })
  name: string;

  @ApiPropertyOptional({ isArray: true, type: PartnerDto })
  partners?: PartnerDto[];

  constructor(category: Category) {
    this.id = category.id;
    this.name = category.name;
    this.partners = category.partners?.map((partner) => new PartnerDto(partner));
  }
}
