import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class ForgotPasswordDto {
  @ApiProperty()
  @IsEmail({}, { message: i18nValidationMessage('validations.IS_EMAIL') })
  email: string;
}
