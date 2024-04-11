import { ApiProperty } from '@nestjs/swagger';
import { CountryCertificateCalculationByRange } from '../entities';

export class CountryCertificateCalculationByRangeDto {
  @ApiProperty()
  minBorder: number;

  @ApiProperty()
  maxBorder: number;

  @ApiProperty()
  certificateCost: number;

  constructor(entity: CountryCertificateCalculationByRange) {
    this.minBorder = entity.minBorder;
    this.maxBorder = entity.maxBorder;
    this.certificateCost = entity.certificateCost;
  }
}
