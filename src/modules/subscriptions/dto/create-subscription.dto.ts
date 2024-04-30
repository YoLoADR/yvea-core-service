import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSubscriptionDto {
  @IsNotEmpty()
  @IsNumber()
  readonly userId: number;

  @IsNotEmpty()
  @IsNumber()
  readonly pluginId: number;

  @IsNotEmpty()
  @IsString()
  readonly status: string;

  @IsNumber()
  readonly trialTokenLimit?: number = 10; // Valeur par défaut pour la limite d'essai

  @IsNumber()
  readonly monthlyTokenLimit?: number = 100; // Valeur par défaut pour la limite mensuelle
}
