import { UpdateCompanyDto } from '@modules/companies/dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEmail, IsOptional, ValidateNested } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class UpdateUserDto {
  @ApiPropertyOptional()
  @IsEmail({}, { message: i18nValidationMessage('validations.IS_EMAIL') })
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({ type: UpdateCompanyDto })
  @ValidateNested({
    message: i18nValidationMessage('validations.VALIDATE_NESTED'),
  })
  @Type(() => UpdateCompanyDto)
  @IsOptional()
  company?: UpdateCompanyDto;
}
