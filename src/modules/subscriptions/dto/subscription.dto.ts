import { ApiProperty } from '@nestjs/swagger';
import { Subscription } from '../entities';

export class SubscriptionDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  startDate: Date;

  @ApiProperty()
  endDate: Date;

  @ApiProperty()
  trialEndDate: Date;

  @ApiProperty()
  status: string;

  @ApiProperty()
  pluginId: number;

  @ApiProperty()
  trialTokenLimit: number; // Nouvelle propriété pour la limite des jetons pendant la période d'essai

  @ApiProperty()
  monthlyTokenLimit: number; // Nouvelle propriété pour la limite mensuelle des jetons

  @ApiProperty()
  usedTokens: number; // Propriété pour le suivi des jetons utilisés

  @ApiProperty()
  periodStartDate: Date;

  constructor(subscription: Subscription) {
    this.id = subscription.id;
    this.startDate = subscription.startDate;
    this.endDate = subscription.endDate;
    this.trialEndDate = subscription.trialEndDate;
    this.status = subscription.status;
    this.pluginId = subscription.pluginId;
    this.trialTokenLimit = subscription.trialTokenLimit; // Attribuez la nouvelle propriété
    this.monthlyTokenLimit = subscription.monthlyTokenLimit;
    this.usedTokens = subscription.usedTokens;
    this.periodStartDate = subscription.periodStartDate;
  }
}
