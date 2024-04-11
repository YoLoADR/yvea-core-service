import {
  BaseEntity,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { Country, CountryAuthority } from '.';

@Entity('countries_registered_certification_authorities')
export class CountryRegisteredCertificationAuthority extends BaseEntity {
  @ManyToOne(
    () => Country,
    ({ registeredCertificationAuthorities }) =>
      registeredCertificationAuthorities,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'country' })
  country: Country;

  @PrimaryColumn({ name: 'country' })
  countryId: string;

  @ManyToOne(() => CountryAuthority, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'authority' })
  authority: CountryAuthority;

  @PrimaryColumn({ name: 'authority' })
  authorityId: string;
}
