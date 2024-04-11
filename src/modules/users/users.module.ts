import { CompaniesModule } from '@modules/companies';
import { SubscriptionsModule } from '@modules/subscriptions';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './controllers';
import { User, UserRole } from './entities';
import { UsersService } from './services';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserRole]), CompaniesModule, SubscriptionsModule],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule { }
