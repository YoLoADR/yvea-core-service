import { Column, Entity, ManyToMany, PrimaryColumn } from 'typeorm';
import { Partner } from '.';

@Entity('categories')
export class Category {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @ManyToMany(() => Partner, (partner) => partner.categories)
  partners: Partner[];
}
