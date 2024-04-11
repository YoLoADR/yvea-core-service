import { User } from '@modules/users/entities';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('inspection_places')
export class InspectionPlace extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user' })
  user: User;

  @Column({ name: 'user' })
  userId: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  address: string;

  @Column({ name: 'postal_code' })
  postalCode: string;

  @Column()
  city: string;

  @Column({ name: 'contact_name' })
  contactName: string;

  @Column({ name: 'contact_lastname' })
  contactLastname: string;

  @Column()
  country: string;
}
