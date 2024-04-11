import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBase64, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class UpdateCertificateDocumentDto {
  @ApiProperty()
  @IsString({ message: i18nValidationMessage('validations.IS_STRING') })
  @IsNotEmpty({ message: i18nValidationMessage('validations.IS_NOT_EMPTY') })
  type: string;

  @ApiPropertyOptional()
  @IsBase64({ message: i18nValidationMessage('validations.IS_BASE64') })
  @IsOptional()
  base64?: string;

  @ApiPropertyOptional()
  @IsString({ message: i18nValidationMessage('validations.IS_STRING') })
  @IsNotEmpty({ message: i18nValidationMessage('validations.IS_NOT_EMPTY') })
  @IsOptional()
  key?: string;

  @ApiPropertyOptional()
  @IsString({ message: i18nValidationMessage('validations.IS_STRING') })
  @IsNotEmpty({ message: i18nValidationMessage('validations.IS_NOT_EMPTY') })
  @IsOptional()
  filename?: string;
}
