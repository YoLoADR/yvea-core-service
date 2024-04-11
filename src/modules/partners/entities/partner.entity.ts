import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DecimalColumnTransformer } from '../../../libs/transformers/decimal-column.transformer';
import { Category } from '.';

@Entity('partners')
export class Partner {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ name: 'description', nullable: true })
  description?: string;

  @Column({ name: 'logo_url', nullable: true })
  logoUrl?: string;

  @Column({ name: 'site_url', nullable: true })
  siteUrl?: string;

  @Column({
    name: 'percentage',
    nullable: true,
    type: 'decimal',
    precision: 5,
    scale: 2,
    transformer: new DecimalColumnTransformer(),
  })
  percentage?: number;

  @ManyToMany(() => Category, (category) => category.partners)
  @JoinTable()
  categories: Category[];
}
