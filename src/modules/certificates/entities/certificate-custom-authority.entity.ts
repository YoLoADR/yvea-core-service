import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Certificate } from '.';

@Entity('certificates_custom_authorities')
export class CertificateCustomAuthority extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Certificate)
  certificate: Certificate;

  @Column({ nullable: true })
  name?: string;

  @Column({ nullable: true })
  contact?: string;

  @Column({ nullable: true })
  email?: string;

  @Column({ nullable: true })
  hasAnnualRegRouteBc?: boolean;

  @Column({ nullable: true })
  reference?: string;

  @Column({ type: 'timestamptz', nullable: true })
  expirationDate?: Date;
}
