import { CountriesModule } from '@modules/countries';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BuyersController } from './controllers';
import { Buyer } from './entities';
import { BuyersService } from './services';

@Module({
  imports: [TypeOrmModule.forFeature([Buyer]), CountriesModule],
  providers: [BuyersService],
  exports: [BuyersService],
  controllers: [BuyersController],
})
export class BuyersModule {}
