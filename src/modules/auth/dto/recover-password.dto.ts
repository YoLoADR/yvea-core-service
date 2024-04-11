import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class RecoverPasswordDto {
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

  @ApiProperty()
  @IsString({ message: i18nValidationMessage('validations.IS_STRING') })
  @IsNotEmpty({ message: i18nValidationMessage('validations.IS_NOT_EMPTY') })
  token: string;
}
