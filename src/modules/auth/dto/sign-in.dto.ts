import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsStrongPassword } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class SignInDto {
  @ApiProperty()
  @IsEmail({}, { message: i18nValidationMessage('validations.IS_EMAIL') })
  email: string;

  @ApiProperty()
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 0,
    },
    {
      message: i18nValidationMessage('validations.IS_STRONG_PASSWORD'),
    },
  )
  password: string;
}
