import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CountryCertificateCalculationByCoefficientWithMax } from '../entities';

export class CountryCertificateCalculationByCoefficientWithMaxDto {
  @ApiProperty()
  minBorder: number;

  @ApiPropertyOptional()
  maxBorder?: number;

  @ApiProperty()
  coefficientPercentage: number;

  constructor(entity: CountryCertificateCalculationByCoefficientWithMax) {
    this.minBorder = entity.minBorder;
    this.maxBorder = entity.maxBorder ?? undefined;
    this.coefficientPercentage = entity.coefficientPercentage;
  }
}
