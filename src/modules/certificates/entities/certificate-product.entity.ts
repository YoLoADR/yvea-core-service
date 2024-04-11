import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import {
  CertificateNomenclatureCode,
  CertificateProductCondition,
  CertificateProductDocument,
  CertificateProductSizeUnit,
} from '.';
import { DecimalColumnTransformer } from '../../../libs/transformers/decimal-column.transformer';

@Entity('certificates_products')
export class CertificateProduct extends BaseEntity {
  @PrimaryColumn({ name: 'certificate' })
  certificateId: number;

  @ManyToOne(() => CertificateNomenclatureCode, ({ products }) => products, {
    onDelete: 'CASCADE',
  })
  @JoinColumn([
    { name: 'certificate', referencedColumnName: 'certificateId' },
    { name: 'code', referencedColumnName: 'codeId' },
    { name: 'country', referencedColumnName: 'countryId' },
  ])
  code: CertificateNomenclatureCode;

  @PrimaryColumn({ name: 'code' })
  codeId: string;

  @PrimaryColumn()
  name: string;

  @PrimaryColumn({ name: 'country' })
  countryId: string;

  @Column({ name: 'country_origin', nullable: true })
  countryOrigin?: string;

  @Column({ nullable: true })
  brand?: string;

  @Column({ nullable: true })
  model?: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  quantity?: number;

  @Column({ default: false })
  standalone: boolean;

  @ManyToOne(() => CertificateProductSizeUnit, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'size_unit' })
  sizeUnit?: CertificateProductSizeUnit;

  @Column({ name: 'size_unit', nullable: true })
  sizeUnitId?: string;

  @ManyToOne(() => CertificateProductCondition, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'condition' })
  condition?: CertificateProductCondition;

  @Column({ name: 'condition', nullable: true })
  conditionId?: string;

  @Column({
    name: 'unit_price',
    nullable: true,
    type: 'decimal',
    precision: 11,
    scale: 2,
    transformer: new DecimalColumnTransformer(),
  })
  unitPrice?: number;

  @OneToMany(() => CertificateProductDocument, ({ product }) => product, {
    eager: true,
  })
  documents: CertificateProductDocument[];
}
