import { CountriesModule } from '@modules/countries';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SellersController } from './controllers';
import { Seller } from './entities';
import { SellersService } from './services';

@Module({
  imports: [TypeOrmModule.forFeature([Seller]), CountriesModule],
  providers: [SellersService],
  exports: [SellersService],
  controllers: [SellersController],
})
export class SellersModule {}
