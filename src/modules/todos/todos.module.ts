import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoController } from './controllers';
import { TodoService } from './services';
import { TodoEntity } from './entities';

@Module({
    imports: [TypeOrmModule.forFeature([TodoEntity])],
    controllers: [TodoController],
    providers: [TodoService],
    exports: [TodoService],
})
export class TodoModule { }
