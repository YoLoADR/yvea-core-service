import { BaseEntity, Entity, PrimaryColumn } from 'typeorm';

@Entity('certificates_status')
export class CertificateStatus extends BaseEntity {
  @PrimaryColumn()
  name: string;
}
