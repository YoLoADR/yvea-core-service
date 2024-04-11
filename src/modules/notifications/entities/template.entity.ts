import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('notifications_templates')
export class NotificationTemplate extends BaseEntity {
  @PrimaryColumn()
  name: string;

  @Column({ name: 'template_id' })
  templateId: number;

  @PrimaryColumn()
  lang: string;
}
