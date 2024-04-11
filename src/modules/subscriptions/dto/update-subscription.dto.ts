import { IsOptional, IsDateString, IsString, IsDate } from 'class-validator';

export class UpdateSubscriptionDto {

  @IsOptional()
  @IsDateString()
  readonly endDate?: string;

  @IsOptional()
  @IsString()
  readonly status?: string;
}