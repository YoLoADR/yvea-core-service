import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('certificates_products_conditions')
export class CertificateProductCondition extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column({ name: 'name_fr' })
  nameFr: string;

  @Column({ name: 'name_en' })
  nameEn: string;
}
