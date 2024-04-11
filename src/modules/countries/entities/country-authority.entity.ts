import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { CountryRegisteredCertificationAuthority } from './country-registered-certification-authority.entity';

@Entity('countries_authorities')
export class CountryAuthority extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  email?: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ nullable: true })
  contact?: string;

  @OneToMany(
    () => CountryRegisteredCertificationAuthority,
    ({ authority }) => authority,
  )
  registeredCertificationAuthorities: CountryRegisteredCertificationAuthority[];
}
