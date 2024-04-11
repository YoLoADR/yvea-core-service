import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        type: 'postgres',
        host: config.getOrThrow('DATABASE_HOST'),
        port: 5432,
        username: config.getOrThrow('DATABASE_USERNAME'),
        password: config.getOrThrow('DATABASE_PASSWORD'),
        database: config.getOrThrow('DATABASE_NAME'),
        autoLoadEntities: true,
        synchronize: true,
        logging: true,
        ssl: config.getOrThrow('DATABASE_SSL') === 'true' ? { rejectUnauthorized: true } : false,
      }),
    }),
  ],
})
export class DatabaseModule { }
