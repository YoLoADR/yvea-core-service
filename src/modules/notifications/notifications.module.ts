import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationTemplate } from './entities';
import { NotificationsService } from './services';

@Module({
  imports: [TypeOrmModule.forFeature([NotificationTemplate])],
  providers: [NotificationsService],
  exports: [NotificationsService],
})
export class NotificationsModule {}
