import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompaniesController } from './controllers';
import { Company, CompanyType } from './entities';
import { CompaniesService } from './services';

@Module({
  imports: [TypeOrmModule.forFeature([Company, CompanyType])],
  providers: [CompaniesService],
  exports: [CompaniesService],
  controllers: [CompaniesController],
})
export class CompaniesModule {}
