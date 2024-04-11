import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import {
  CountryCertifiableCode,
  CountryCertificateCalculationByCoefficientWithMax,
  CountryCertificateCalculationByRange,
  CountryCurrency,
  CountryRegisteredCertificationAuthority,
  CountryRequiredDocumentByCertificate,
  CountryRequiredDocumentByCode,
} from '.';

@Entity('countries')
export class Country extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column({ name: 'name_fr' })
  nameFr: string;

  @Column({ name: 'name_en' })
  nameEn: string;

  @Column({ name: 'no_certification_required_below_threshold', nullable: true })
  noCertificationRequiredBelowThreshold: number;

  @ManyToOne(() => CountryCurrency, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'currency' })
  currency: CountryCurrency;

  @Column({ name: 'currency' })
  currencyId: string;

  @OneToMany(
    () => CountryCertificateCalculationByRange,
    ({ country }) => country,
    { eager: true },
  )
  certificateCalculationByRange?: CountryCertificateCalculationByRange[];

  @OneToOne(
    () => CountryCertificateCalculationByCoefficientWithMax,
    ({ country }) => country,
    { eager: true },
  )
  certificateCalculationByCoefficientWithMax?: CountryCertificateCalculationByCoefficientWithMax;

  @OneToMany(
    () => CountryRegisteredCertificationAuthority,
    ({ country }) => country,
    { eager: true },
  )
  registeredCertificationAuthorities: CountryRegisteredCertificationAuthority[];

  @OneToMany(
    () => CountryRequiredDocumentByCertificate,
    ({ country }) => country,
  )
  requiredDocumentsByCertificate: CountryRequiredDocumentByCertificate[];

  @OneToMany(() => CountryRequiredDocumentByCode, ({ country }) => country)
  requiredDocumentsByCode: CountryRequiredDocumentByCode[];

  @OneToMany(() => CountryCertifiableCode, ({ country }) => country)
  certifiableCodes: CountryCertifiableCode[];
}
