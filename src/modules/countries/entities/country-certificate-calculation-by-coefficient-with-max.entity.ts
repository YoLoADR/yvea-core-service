import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Country } from '.';

@Entity('countries_certificate_calculation_by_coefficient_with_max')
export class CountryCertificateCalculationByCoefficientWithMax extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(
    () => Country,
    ({ certificateCalculationByCoefficientWithMax }) =>
      certificateCalculationByCoefficientWithMax,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'country' })
  country: Country;

  @Column({ name: 'min_border' })
  minBorder: number;

  @Column({ name: 'max_border', nullable: true })
  maxBorder?: number;

  @Column({ name: 'coefficient_percentage', type: 'float' })
  coefficientPercentage: number;
}
