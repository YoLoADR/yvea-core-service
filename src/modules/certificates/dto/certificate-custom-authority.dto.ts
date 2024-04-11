import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { CertificateCustomAuthority } from '../entities';

export class CertificateCustomAuthorityDto {
  @ApiPropertyOptional()
  @IsString({ message: i18nValidationMessage('validations.IS_STRING') })
  @IsNotEmpty({ message: i18nValidationMessage('validations.IS_NOT_EMPTY') })
  @IsOptional()
  name?: string;

  @ApiPropertyOptional()
  @IsString({ message: i18nValidationMessage('validations.IS_STRING') })
  @IsNotEmpty({ message: i18nValidationMessage('validations.IS_NOT_EMPTY') })
  @IsOptional()
  contact?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEmail({}, { message: i18nValidationMessage('validations.IS_EMAIL') })
  email?: string;

  @ApiPropertyOptional({ name: 'has_annual_reg_route_bc' })
  @IsOptional()
  @IsBoolean({ message: i18nValidationMessage('validations.IS_BOOLEAN') })
  hasAnnualRegRouteBc?: boolean;

  @ApiPropertyOptional()
  @IsString({ message: i18nValidationMessage('validations.IS_STRING') })
  @IsNotEmpty({ message: i18nValidationMessage('validations.IS_NOT_EMPTY') })
  @IsOptional()
  reference?: string;

  @ApiPropertyOptional({
    name: 'expiration_date',
    default: new Date().toISOString().split('T')[0],
  })
  @IsOptional()
  @IsDateString(
    {},
    {
      message: i18nValidationMessage('validations.IS_DATE_STRING'),
    },
  )
  @Transform(({ value }) =>
    value ? new Date(value).toISOString().split('T')[0] : undefined,
  )
  @MaxLength(10, { message: i18nValidationMessage('validations.MAX_LENGTH') })
  expirationDate?: Date;

  constructor(entity: CertificateCustomAuthority) {
    this.name = entity?.name ?? undefined;
    this.contact = entity?.contact ?? undefined;
    this.email = entity?.email ?? undefined;
    this.hasAnnualRegRouteBc = entity?.hasAnnualRegRouteBc ?? undefined;
    this.reference = entity?.reference ?? undefined;
    this.expirationDate = entity?.expirationDate ?? undefined;
  }
}
