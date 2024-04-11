import { BaseEntity, Entity, PrimaryColumn } from 'typeorm';

@Entity('certificates_incoterm')
export class CertificateIncoterm extends BaseEntity {
  @PrimaryColumn()
  name: string;
}
