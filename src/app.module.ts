import { DatabaseModule } from '@libs/database';
import { I18nModule } from '@libs/i18n';
import { AuthModule } from '@modules/auth';
import { BuyersModule } from '@modules/buyers';
import { CertificatesModule } from '@modules/certificates';
import { CompaniesModule } from '@modules/companies';
import { CountriesModule } from '@modules/countries';
import { InspectionPlacesModule } from '@modules/inspection-places';
import { NotificationsModule } from '@modules/notifications';
import { SellersModule } from '@modules/sellers';
import { StorageModule } from '@modules/storage';
import { UsersModule } from '@modules/users';
import { VirtualAssistantModule } from '@modules/virtual-assistant';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { SerializeInterceptor } from 'serialize-interceptor';
import { HealthController } from './health';
import { PartnersModule } from './modules/partners/partners.module';
import { TodoModule } from './modules/todos';
import { SubscriptionsModule } from './modules/subscriptions';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    StorageModule,
    I18nModule,
    AuthModule,
    UsersModule,
    CompaniesModule,
    CountriesModule,
    CertificatesModule,
    NotificationsModule,
    BuyersModule,
    SellersModule,
    InspectionPlacesModule,
    VirtualAssistantModule,
    PartnersModule,
    TodoModule,
    SubscriptionsModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: SerializeInterceptor,
    },
  ],
  controllers: [HealthController],
})
export class AppModule {
  onApplicationBootstrap() {
    // initEnums();
    // initConstants();
    // initAdminUser();
  }
}
