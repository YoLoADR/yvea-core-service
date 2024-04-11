import { Certificate } from '@modules/certificates/entities';
import { Company } from '@modules/companies/entities';
import { Subscription } from '@modules/subscriptions/entities';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserRole } from '.';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ default: 'en' })
  lastLang: string;

  @ManyToOne(() => UserRole, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'role' })
  role: UserRole;

  @Column({ name: 'role', default: 'CLIENT' })
  roleId: string;

  @Column({ name: 'validation_token', nullable: true })
  validationToken?: string;

  @Column({ name: 'forgot_password_token', nullable: true })
  forgotPasswordToken?: string;

  @Column({ name: 'validated_at', type: 'timestamptz', nullable: true })
  validatedAt?: Date;

  @OneToOne(() => Company, ({ user }) => user, { nullable: true })
  company?: Company;

  @OneToMany(() => Subscription, subscription => subscription.user)
  subscriptions: Subscription[];

  @OneToMany(() => Certificate, ({ user }) => user)
  certificates: Certificate;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
