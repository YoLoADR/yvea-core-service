import { ApiProperty } from '@nestjs/swagger';
import { CertificateProductCondition } from '../entities';

export class CertificateProductConditionDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  constructor(entity: CertificateProductCondition) {
    this.id = entity.id;
    this.name = entity.nameFr || entity.nameEn;
  }
}
