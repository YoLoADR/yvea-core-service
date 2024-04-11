import { PageMetaDtoParameters } from '@libs/interfaces';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { PageMetaDto } from './page-meta.dto';

export class PageDto<T> {
  @ApiProperty({ isArray: true })
  @IsArray({ message: i18nValidationMessage('validations.IS_ARRAY') })
  readonly data: T[];

  @ApiProperty({ type: PageMetaDto })
  @Type(() => PageMetaDto)
  @ValidateNested({
    message: i18nValidationMessage('validations.VALIDATE_NESTED'),
  })
  readonly meta: PageMetaDto;

  constructor(data: T[], meta: PageMetaDtoParameters) {
    this.data = data;
    this.meta = new PageMetaDto(meta);
  }
}
