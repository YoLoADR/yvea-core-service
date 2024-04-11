import { ApiProperty } from '@nestjs/swagger';
import { CertificateMethod } from '../entities';

export class CertificateMethodDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  constructor(entity: CertificateMethod) {
    this.id = entity.id;
    this.name = entity.nameFr || entity.nameEn;
  }
}
