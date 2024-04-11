import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  ValidateNested,
} from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { UpdateCertificateDocumentDto } from '.';

export class UpdateCertificateProductDto {
  @ApiProperty()
  @IsString({ message: i18nValidationMessage('validations.IS_STRING') })
  @IsNotEmpty({ message: i18nValidationMessage('validations.IS_NOT_EMPTY') })
  name: string;

  @ApiPropertyOptional()
  @IsString({ message: i18nValidationMessage('validations.IS_STRING') })
  @IsOptional()
  brand?: string;

  @ApiPropertyOptional()
  @IsString({ message: i18nValidationMessage('validations.IS_STRING') })
  @IsOptional()
  model?: string;

  @ApiPropertyOptional()
  @IsString({ message: i18nValidationMessage('validations.IS_STRING') })
  @IsOptional()
  description?: string;

  @ApiPropertyOptional()
  @IsNumber({}, { message: i18nValidationMessage('validations.IS_NUMBER') })
  @IsOptional()
  quantity?: number;

  @ApiPropertyOptional({ name: 'size_unit' })
  @IsString({ message: i18nValidationMessage('validations.IS_STRING') })
  @IsOptional()
  sizeUnit?: string;

  @ApiPropertyOptional()
  @IsString({ message: i18nValidationMessage('validations.IS_STRING') })
  @IsOptional()
  condition?: string;

  @ApiPropertyOptional({ name: 'unit_price' })
  @IsNumber({}, { message: i18nValidationMessage('validations.IS_NUMBER') })
  @Max(999_999_999)
  @IsOptional()
  unitPrice?: number;

  @ApiPropertyOptional()
  @IsString({ message: i18nValidationMessage('validations.IS_STRING') })
  @IsOptional()
  country?: string;

  @ApiPropertyOptional({ name: 'country_origin' })
  @IsString({ message: i18nValidationMessage('validations.IS_STRING') })
  @IsOptional()
  countryOrigin?: string;

  @ApiPropertyOptional()
  @IsBoolean({ message: i18nValidationMessage('validations.IS_BOOLEAN') })
  @IsOptional()
  standalone?: boolean;

  @ApiPropertyOptional({
    type: UpdateCertificateDocumentDto,
    isArray: true,
  })
  @ValidateNested({
    each: true,
    message: i18nValidationMessage('validations.VALIDATE_NESTED'),
  })
  @Type(() => UpdateCertificateDocumentDto)
  @IsOptional()
  documents?: UpdateCertificateDocumentDto[];
}
