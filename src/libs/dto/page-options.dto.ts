import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class PageOptionsDto {
  @ApiPropertyOptional({
    minimum: 1,
    default: 1,
  })
  @Type(() => Number)
  @IsInt({ message: i18nValidationMessage('validations.IS_INT') })
  @Min(1, { message: i18nValidationMessage('validations.MIN') })
  @IsOptional()
  readonly page?: number = 1;

  @ApiPropertyOptional({
    minimum: 1,
    maximum: 50,
    default: 10,
  })
  @Type(() => Number)
  @IsInt({ message: i18nValidationMessage('validations.IS_INT') })
  @Min(1, { message: i18nValidationMessage('validations.MIN') })
  @Max(50, { message: i18nValidationMessage('validations.MAX') })
  @IsOptional()
  readonly take?: number = 10;

  get skip(): number {
    return (this.page - 1) * this.take;
  }
}
