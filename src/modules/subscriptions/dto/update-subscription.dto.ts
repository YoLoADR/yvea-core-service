import { IsOptional, IsDateString, IsString, IsNumber } from 'class-validator';

export class UpdateSubscriptionDto {
  @IsOptional()
  @IsDateString()
  readonly endDate?: string;

  @IsOptional()
  @IsString()
  readonly status?: string;

  @IsOptional()
  @IsNumber()
  readonly trialTokenLimit?: number; // Propriété optionnelle pour mettre à jour la limite de jetons d'essai

  @IsOptional()
  @IsNumber()
  readonly monthlyTokenLimit?: number; // Propriété optionnelle pour la limite mensuelle

  @IsOptional()
  @IsNumber()
  readonly usedTokens?: number; // Suivi des jetons utilisés
}
