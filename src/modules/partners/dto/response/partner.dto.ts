import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Category, Partner } from '../../entities';
import { CategoryDto } from './category.dto';

export class PartnerDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Partner name' })
  name: string;

  @ApiPropertyOptional({ example: 'Partner description' })
  description?: string;

  @ApiPropertyOptional({ example: 'https://partner.com/logo.png' })
  logoUrl?: string;

  @ApiPropertyOptional({ example: 'https://partner.com' })
  siteUrl?: string;

  @ApiPropertyOptional({ example: -0.1 })
  percentage?: number;

  @ApiPropertyOptional({ isArray: true, type: Category })
  categories: CategoryDto[];

  constructor(partner: Partner) {
    this.id = partner.id;
    this.name = partner.name;
    this.description = partner.description;
    this.logoUrl = partner.logoUrl;
    this.siteUrl = partner.siteUrl;
    this.percentage = partner.percentage;
    this.categories = partner.categories?.map(
      (category) => new CategoryDto(category),
    );
  }
}
