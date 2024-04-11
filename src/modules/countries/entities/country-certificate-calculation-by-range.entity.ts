import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Country } from '.';

@Entity('countries_certificate_calculation_by_range')
export class CountryCertificateCalculationByRange extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => Country,
    ({ certificateCalculationByRange }) => certificateCalculationByRange,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'country' })
  country: Country;

  @Column({ name: 'min_border' })
  minBorder: number;

  @Column({ name: 'max_border' })
  maxBorder: number;

  @Column({ name: 'certificate_cost' })
  certificateCost: number;
}
