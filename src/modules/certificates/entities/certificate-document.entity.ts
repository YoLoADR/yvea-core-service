import { CountryRequiredDocument } from '@modules/countries/entities';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { Certificate } from '.';

@Entity('certificates_documents')
export class CertificateDocument extends BaseEntity {
  @ManyToOne(() => Certificate, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'certificate' })
  certificate: Certificate;

  @PrimaryColumn({ name: 'certificate' })
  certificateId: number;

  @ManyToOne(() => CountryRequiredDocument, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'type' })
  type: CountryRequiredDocument;

  @PrimaryColumn({ name: 'type' })
  typeId: string;

  @Column()
  key: string;

  @Column({ nullable: true })
  filename?: string;
}
