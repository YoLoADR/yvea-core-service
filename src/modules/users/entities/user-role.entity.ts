import { BaseEntity, Entity, PrimaryColumn } from 'typeorm';

@Entity('users_roles')
export class UserRole extends BaseEntity {
  @PrimaryColumn()
  name: string;
}
