import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { CertificateProductDto } from '.';
import { CertificateNomenclatureCode } from '../entities';

export class CertificateNomenclatureCodeDto {
  @ApiProperty()
  @IsString({ message: i18nValidationMessage('validations.IS_STRING') })
  @IsNotEmpty({ message: i18nValidationMessage('validations.IS_NOT_EMPTY') })
  code: string;

  @ApiPropertyOptional()
  @IsNumber({}, { message: i18nValidationMessage('validations.IS_NUMBER') })
  @IsOptional()
  amount: number;

  @ApiPropertyOptional({
    type: 'array',
    items: {
      oneOf: [{ $ref: '#/components/schemas/CertificateProductDto' }],
    },
  })
  products?: CertificateProductDto[];

  constructor(entity?: CertificateNomenclatureCode) {
    this.code = entity?.codeId ?? undefined;
    this.amount =
      entity?.products?.reduce(
        (a, b) => a + (b.unitPrice || 0) * (b.quantity || 0),
        0,
      ) ?? undefined;
    this.products = entity?.products?.length
      ? entity.products?.map((p) => new CertificateProductDto(p))
      : undefined;
  }
}
