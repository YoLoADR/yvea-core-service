import { ApiProperty } from '@nestjs/swagger';
import { CertificateProductSizeUnit } from '../entities';

export class CertificateProductSizeUnitDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  constructor(entity: CertificateProductSizeUnit) {
    this.id = entity.id;
    this.name = entity.nameFr || entity.nameEn;
  }
}
