import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import {
  IsDefined,
  IsEnum,
  IsNegative,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUrl,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import { MarketplaceCategory } from '../../../../libs/constants/marketplaceCategory.constants';

export class CreatePartnerDto {
  @ApiProperty({ example: 'Partner name' })
  @IsNotEmpty()
  @IsDefined()
  name: string;

  @ApiPropertyOptional({ example: 'Partner description' })
  @MaxLength(50)
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ example: 'https://partner.com/logo.png' })
  @IsOptional()
  logoUrl?: string;

  @ApiPropertyOptional({ example: 'https://partner.com' })
  @IsUrl()
  @IsOptional()
  siteUrl?: string;

  @ApiPropertyOptional({ example: -0.1 })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(-99.99)
  @Max(-0.1)
  @IsNegative()
  @IsOptional()
  percentage?: number;

  @ApiPropertyOptional({
    example: [MarketplaceCategory.DIGITAL_SOLUTIONS],
    enum: MarketplaceCategory,
    isArray: true,
  })
  @IsEnum(MarketplaceCategory, { each: true })
  @IsDefined()
  categories: MarketplaceCategory[];
}

export class UpdatePartnerDto extends PartialType(CreatePartnerDto) {}
