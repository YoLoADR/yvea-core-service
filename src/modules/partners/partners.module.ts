import { Module } from '@nestjs/common';
import { PartnersService } from './services/partners/partners.service';
import { PartnersController } from './controllers/partners/partners.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Partner } from './entities/partner.entity';
import { CategoriesController } from './controllers/categories/categories.controller';
import { CategoriesService } from './services/categories/categories.service';
import { Category } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([Partner, Category])],
  providers: [PartnersService, CategoriesService],
  controllers: [PartnersController, CategoriesController],
})
export class PartnersModule {}
