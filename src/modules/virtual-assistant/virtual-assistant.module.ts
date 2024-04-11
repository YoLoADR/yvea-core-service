import { NotificationsModule } from '@modules/notifications';
import { UsersModule } from '@modules/users';
import { Module } from '@nestjs/common';
import { VirtualAssistantController } from './controllers';
import { VirtualAssistantService } from './services';

@Module({
  imports: [NotificationsModule, UsersModule],
  providers: [VirtualAssistantService],
  controllers: [VirtualAssistantController],
})
export class VirtualAssistantModule {}
