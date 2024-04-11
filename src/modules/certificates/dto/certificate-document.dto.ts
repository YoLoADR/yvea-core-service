import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { CertificateDocument } from '../entities';

export class CertificateDocumentDto {
  @ApiProperty()
  @IsString({ message: i18nValidationMessage('validations.IS_STRING') })
  @IsNotEmpty({ message: i18nValidationMessage('validations.IS_NOT_EMPTY') })
  key: string;

  @ApiProperty()
  @IsString({ message: i18nValidationMessage('validations.IS_STRING') })
  @IsNotEmpty({ message: i18nValidationMessage('validations.IS_NOT_EMPTY') })
  type: string;

  @ApiPropertyOptional()
  @IsString({ message: i18nValidationMessage('validations.IS_STRING') })
  @IsNotEmpty({ message: i18nValidationMessage('validations.IS_NOT_EMPTY') })
  @IsOptional()
  filename?: string;

  constructor(entity: CertificateDocument) {
    this.key = entity.key;
    this.type = entity.typeId;
    this.filename = entity.filename;
  }
}
