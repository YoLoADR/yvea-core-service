import { Buyer } from '@modules/buyers/entities';
import { Country, CountryAuthority } from '@modules/countries/entities';
import { InspectionPlace } from '@modules/inspection-places/entities';
import { Seller } from '@modules/sellers/entities';
import { User } from '@modules/users/entities';
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
import {
  CertificateCustomAuthority,
  CertificateDocument,
  CertificateIncoterm,
  CertificateMethod,
  CertificateNomenclatureCode,
  CertificateStatus,
} from '.';
@Entity('certificates')
export class Certificate extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'total_cost', type: 'float', nullable: true })
  totalCost?: number;

  @ManyToOne(() => User, ({ certificates }) => certificates, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user' })
  user: User;

  @Column({ name: 'user' })
  userId: number;

  @ManyToOne(() => CertificateStatus, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'status' })
  status: CertificateStatus;

  @ManyToOne(() => Country, { onDelete: 'CASCADE', nullable: true })
  @JoinColumn({ name: 'country' })
  country: Country;

  @Column({ name: 'country', nullable: true })
  countryId?: string;

  @Column({ nullable: true })
  title?: string;

  @OneToMany(
    () => CertificateNomenclatureCode,
    ({ certificate }) => certificate,
    { eager: true },
  )
  nomenclatureCodes: CertificateNomenclatureCode[];

  @ManyToOne(() => CountryAuthority, { onDelete: 'CASCADE', nullable: true })
  @JoinColumn({ name: 'authority' })
  authority?: CountryAuthority;

  @OneToOne(() => CertificateCustomAuthority, {
    onDelete: 'CASCADE',
    nullable: true,
    eager: true,
  })
  @JoinColumn({ name: 'custom_authority' })
  customAuthority?: CertificateCustomAuthority;

  @Column({ name: 'custom_authority', nullable: true })
  customAuthorityId?: number;

  @ManyToOne(() => Seller, { onDelete: 'CASCADE', nullable: true, eager: true })
  @JoinColumn({ name: 'seller' })
  seller?: Seller;

  @Column({ name: 'seller', nullable: true })
  sellerId?: number;

  @ManyToOne(() => Buyer, { onDelete: 'CASCADE', nullable: true, eager: true })
  @JoinColumn({ name: 'buyer' })
  buyer?: Buyer;

  @Column({ name: 'buyer', nullable: true })
  buyerId?: number;

  @ManyToOne(() => InspectionPlace, {
    onDelete: 'CASCADE',
    nullable: true,
    eager: true,
  })
  @JoinColumn({ name: 'inspection_place' })
  inspectionPlace?: InspectionPlace;

  @Column({ name: 'inspection_place', nullable: true })
  inspectionPlaceId?: number;

  @Column({ name: 'status', default: 'DRAFT' })
  statusId: string;

  @OneToMany(() => CertificateDocument, ({ certificate }) => certificate, {
    eager: true,
  })
  documents: CertificateDocument[];

  @Column({ name: 'inspection_date', type: 'timestamptz', nullable: true })
  inspectionDate?: Date;

  @Column({
    name: 'follow_up_email_sent_at',
    type: 'timestamptz',
    nullable: true,
  })
  followUpEmailSentAt?: Date;

  @Column({
    name: 'confirmation_email_sent_at',
    type: 'timestamptz',
    nullable: true,
  })
  confirmationEmailSentAt?: Date;

  @ManyToOne(() => CertificateMethod, { onDelete: 'CASCADE', nullable: true })
  @JoinColumn({ name: 'expedition_method' })
  expeditionMethod?: CertificateMethod;

  @Column({ name: 'expedition_method', nullable: true })
  expeditionMethodId?: string;

  @ManyToOne(() => CertificateIncoterm, { onDelete: 'CASCADE', nullable: true })
  @JoinColumn({ name: 'expedition_incoterm' })
  expeditionIncoterm?: CertificateIncoterm;

  @Column({ name: 'expedition_incoterm', nullable: true })
  expeditionIncotermId?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
