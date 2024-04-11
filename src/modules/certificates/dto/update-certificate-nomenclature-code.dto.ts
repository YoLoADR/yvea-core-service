import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { UpdateCertificateProductDto } from '.';

export class UpdateCertificateNomenclatureCodeDto {
  @ApiProperty()
  @IsString({ message: i18nValidationMessage('validations.IS_STRING') })
  @IsNotEmpty({ message: i18nValidationMessage('validations.IS_NOT_EMPTY') })
  code: string;

  @ApiPropertyOptional({
    type: 'array',
    items: {
      oneOf: [{ $ref: '#/components/schemas/UpdateCertificateProductDto' }],
    },
  })
  @ValidateNested({
    each: true,
    message: i18nValidationMessage('validations.VALIDATE_NESTED'),
  })
  @Type(() => UpdateCertificateProductDto)
  @IsOptional()
  products?: UpdateCertificateProductDto[];
}
