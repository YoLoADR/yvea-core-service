import { IsNotEmpty, IsNumber, IsString, IsDate } from 'class-validator';

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
}