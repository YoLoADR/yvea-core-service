import { Country, CountryCertifiableCode } from '@modules/countries/entities';
import {
  BaseEntity,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { Certificate, CertificateProduct } from '.';

@Entity('certificates_nomenclature_codes')
export class CertificateNomenclatureCode extends BaseEntity {
  @ManyToOne(() => Certificate, ({ documents }) => documents, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'certificate' })
  certificate: Certificate;

  @PrimaryColumn({ name: 'certificate' })
  certificateId: number;

  @ManyToOne(() => CountryCertifiableCode)
  @JoinColumn([
    { name: 'code', referencedColumnName: 'code' },
    { name: 'country', referencedColumnName: 'countryId' },
  ])
  code: CountryCertifiableCode;

  @PrimaryColumn({ name: 'code' })
  codeId: string;

  @ManyToOne(() => Country, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'country' })
  country: Country;

  @PrimaryColumn({ name: 'country' })
  countryId: string;

  @OneToMany(() => CertificateProduct, ({ code }) => code, { eager: true })
  products: CertificateProduct[];
}
