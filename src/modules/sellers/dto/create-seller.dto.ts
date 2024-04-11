import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class CreateSellerDto {
  @ApiProperty()
  @IsString({ message: i18nValidationMessage('validations.IS_STRING') })
  @IsNotEmpty({ message: i18nValidationMessage('validations.IS_NOT_EMPTY') })
  name: string;

  @ApiProperty()
  @IsEmail({}, { message: i18nValidationMessage('validations.IS_EMAIL') })
  email: string;

  @ApiProperty()
  @IsPhoneNumber(null, {
    message: i18nValidationMessage('validations.IS_PHONE_NUMBER'),
  })
  phone: string;

  @ApiProperty()
  @IsString({ message: i18nValidationMessage('validations.IS_STRING') })
  @IsNotEmpty({ message: i18nValidationMessage('validations.IS_NOT_EMPTY') })
  address: string;

  @ApiProperty({ name: 'postal_code' })
  @IsString({ message: i18nValidationMessage('validations.IS_STRING') })
  @IsNotEmpty({ message: i18nValidationMessage('validations.IS_NOT_EMPTY') })
  postalCode: string;

  @ApiProperty()
  @IsString({ message: i18nValidationMessage('validations.IS_STRING') })
  @IsNotEmpty({ message: i18nValidationMessage('validations.IS_NOT_EMPTY') })
  city: string;

  @ApiProperty()
  @IsString({ message: i18nValidationMessage('validations.IS_STRING') })
  @IsNotEmpty({ message: i18nValidationMessage('validations.IS_NOT_EMPTY') })
  country: string;
}
