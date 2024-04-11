import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('certificates_products_size_units')
export class CertificateProductSizeUnit extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column({ name: 'name_fr' })
  nameFr: string;

  @Column({ name: 'name_en' })
  nameEn: string;
}
