import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { Country } from '.';

@Entity('countries_certifiable_codes')
export class CountryCertifiableCode extends BaseEntity {
  @ManyToOne(
    () => Country,
    ({ requiredDocumentsByCode }) => requiredDocumentsByCode,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'country' })
  country: Country;

  @PrimaryColumn({ name: 'country' })
  countryId: string;

  @PrimaryColumn()
  code: string;

  @Column({ name: 'english_denomination', nullable: true })
  englishDenomination?: string;

  @Column({ name: 'french_denomination', nullable: true })
  frenchDenomination?: string;

  @Column({
    name: 'certification_route_letters',
    nullable: true,
    type: 'simple-array',
  })
  certificationRouteLetters?: string[];
}
