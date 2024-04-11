import { CountryRequiredDocument } from '@modules/countries/entities';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { CertificateProduct } from '.';

@Entity('certificates_products_documents')
export class CertificateProductDocument extends BaseEntity {
  @ManyToOne(() => CertificateProduct, { onDelete: 'CASCADE' })
  @JoinColumn([
    { name: 'certificate', referencedColumnName: 'certificateId' },
    { name: 'code', referencedColumnName: 'codeId' },
    { name: 'name', referencedColumnName: 'name' },
    { name: 'country', referencedColumnName: 'countryId' },
  ])
  product: CertificateProduct;

  @ManyToOne(() => CountryRequiredDocument, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'type' })
  type: CountryRequiredDocument;

  @PrimaryColumn({ name: 'type' })
  typeId: string;

  @PrimaryColumn({ name: 'certificate' })
  certificateId: number;

  @PrimaryColumn()
  code: string;

  @PrimaryColumn()
  name: string;

  @PrimaryColumn()
  country: string;

  @Column()
  key: string;

  @Column({ nullable: true })
  filename?: string;
}
