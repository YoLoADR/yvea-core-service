import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CountryCertifiableCode } from '../entities';

export class CountryCertifiableCodeDto {
  @ApiProperty()
  code: string;

  @ApiPropertyOptional()
  englishDenomination?: string;

  @ApiPropertyOptional()
  frenchDenomination?: string;

  @ApiPropertyOptional()
  certificationRouteLetters?: string[];

  constructor(entity: CountryCertifiableCode) {
    this.code = entity.code ?? undefined;
    this.englishDenomination = entity.englishDenomination ?? undefined;
    this.frenchDenomination = entity.frenchDenomination ?? undefined;
    this.certificationRouteLetters =
      entity.certificationRouteLetters ?? undefined;
  }
}
