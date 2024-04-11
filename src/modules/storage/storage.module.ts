import { UsersModule } from '@modules/users';
import { Module } from '@nestjs/common';
import { StorageController } from './controllers';
import { StorageService } from './services';

@Module({
  imports: [UsersModule],
  providers: [StorageService],
  exports: [StorageService],
  controllers: [StorageController],
})
export class StorageModule {}
