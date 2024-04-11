import { BaseEntity, Entity, PrimaryColumn } from 'typeorm';

@Entity('countries_required_documents')
export class CountryRequiredDocument extends BaseEntity {
  @PrimaryColumn()
  name: string;
}
