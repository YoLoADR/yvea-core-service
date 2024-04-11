import { CountriesModule } from '@modules/countries';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InspectionPlacesController } from './controllers';
import { InspectionPlace } from './entities';
import { InspectionPlacesService } from './services';

@Module({
  imports: [TypeOrmModule.forFeature([InspectionPlace]), CountriesModule],
  providers: [InspectionPlacesService],
  exports: [InspectionPlacesService],
  controllers: [InspectionPlacesController],
})
export class InspectionPlacesModule {}
