import { BaseEntity, Entity, PrimaryColumn } from 'typeorm';

@Entity('countries_currencies')
export class CountryCurrency extends BaseEntity {
  @PrimaryColumn()
  code: string;
}
