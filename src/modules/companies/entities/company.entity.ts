import { User } from '@modules/users/entities';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CompanyType } from '.';

@Entity('companies')
export class Company extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, ({ company }) => company, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user' })
  user: User;

  @Column()
  name: string;

  @Column({ name: 'fiscal_number', nullable: true })
  fiscalNumber?: string;

  @Column()
  street: string;

  @Column({ name: 'postal_code' })
  postalCode: string;

  @Column()
  city: string;

  @Column()
  country: string;

  @ManyToOne(() => CompanyType, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'type' })
  type: CompanyType;

  @Column({ name: 'type' })
  typeId: string;
}
