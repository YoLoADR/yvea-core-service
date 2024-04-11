import {
  BaseEntity,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { Country, CountryRequiredDocument } from '.';

@Entity('countries_required_documents_by_certificate')
export class CountryRequiredDocumentByCertificate extends BaseEntity {
  @ManyToOne(
    () => Country,
    ({ requiredDocumentsByCertificate }) => requiredDocumentsByCertificate,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'country' })
  country: Country;

  @PrimaryColumn({ name: 'country' })
  countryId: string;

  @ManyToOne(() => CountryRequiredDocument, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'document' })
  document: CountryRequiredDocument;

  @PrimaryColumn({ name: 'document' })
  documentId: string;
}
