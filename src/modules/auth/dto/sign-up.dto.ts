import { CreateCompanyDto } from '@modules/companies/dto';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  ValidateNested,
} from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class SignUpDto {
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

  @ApiProperty({ name: 'first_name' })
  @IsString({ message: i18nValidationMessage('validations.IS_STRING') })
  @IsNotEmpty({ message: i18nValidationMessage('validations.IS_NOT_EMPTY') })
  firstName: string;

  @ApiProperty({ name: 'last_name' })
  @IsString({ message: i18nValidationMessage('validations.IS_STRING') })
  @IsNotEmpty({ message: i18nValidationMessage('validations.IS_NOT_EMPTY') })
  lastName: string;

  @ApiProperty()
  @IsString({ message: i18nValidationMessage('validations.IS_STRING') })
  @IsNotEmpty({ message: i18nValidationMessage('validations.IS_NOT_EMPTY') })
  phone: string;

  @ApiProperty({ type: CreateCompanyDto })
  @ValidateNested({
    message: i18nValidationMessage('validations.VALIDATE_NESTED'),
  })
  @Type(() => CreateCompanyDto)
  company: CreateCompanyDto;
}
