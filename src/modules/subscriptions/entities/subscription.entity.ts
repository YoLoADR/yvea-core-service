import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from 'typeorm';
import { User } from '../../users/entities';
import { Plugin } from './plugin.entity'; // Assurez-vous de créer cette entité également

@Entity('subscriptions')
export class Subscription {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.subscriptions)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'user_id', nullable: true })
  userId: number;

  @ManyToOne(() => Plugin)
  plugin: Plugin;

  @Column({ name: 'plugin_id', nullable: true })
  pluginId: number;

  @Column({ name: 'start_date' })
  startDate: Date;

  @Column({ name: 'end_date', nullable: true })
  endDate: Date;

  @Column({ name: 'trial_end_date' })
  trialEndDate: Date;

  @Column({ name: 'status', nullable: true })
  status: string;

  @Column({ name: 'trial_token_limit', type: 'int', default: 15000 }) // Valeur par défaut pour la limite d'essai
  trialTokenLimit: number;

  @Column({ name: 'monthly_token_limit', type: 'int', default: 35000 }) // Valeur par défaut pour la limite mensuelle
  monthlyTokenLimit: number;

  @Column({ name: 'used_tokens', type: 'int', default: 0 }) // Valeur par défaut pour les jetons utilisés
  usedTokens: number;

  @Column({ name: 'period_start_date', nullable: true })
  periodStartDate: Date;
}