import {
  BaseEntity,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { Country, CountryRequiredDocument } from '.';

@Entity('countries_required_documents_by_code')
export class CountryRequiredDocumentByCode extends BaseEntity {
  @ManyToOne(
    () => Country,
    ({ requiredDocumentsByCode }) => requiredDocumentsByCode,
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
