import { BuyersModule } from '@modules/buyers';
import { CountriesModule } from '@modules/countries';
import { InspectionPlacesModule } from '@modules/inspection-places';
import { NotificationsModule } from '@modules/notifications';
import { SellersModule } from '@modules/sellers';
import { StorageModule } from '@modules/storage';
import { UsersModule } from '@modules/users';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientFollowUpForADraftedDocumentFor2WeeksCommand } from './commands/client-follow-up-for-a-drafted-document-for-2-weeks.command';
import { CertificatesController } from './controllers';
import {
  Certificate,
  CertificateCustomAuthority,
  CertificateDocument,
  CertificateIncoterm,
  CertificateMethod,
  CertificateNomenclatureCode,
  CertificateProduct,
  CertificateProductCondition,
  CertificateProductDocument,
  CertificateProductSizeUnit,
  CertificateStatus,
} from './entities';
import { CertificatesService } from './services';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Certificate,
      CertificateStatus,
      CertificateProduct,
      CertificateDocument,
      CertificateIncoterm,
      CertificateProductDocument,
      CertificateProductSizeUnit,
      CertificateCustomAuthority,
      CertificateProductCondition,
      CertificateNomenclatureCode,
      CertificateMethod,
    ]),
    UsersModule,
    CountriesModule,
    BuyersModule,
    SellersModule,
    InspectionPlacesModule,
    StorageModule,
    NotificationsModule,
  ],
  providers: [
    CertificatesService,
    ClientFollowUpForADraftedDocumentFor2WeeksCommand,
  ],
  controllers: [CertificatesController],
})
export class CertificatesModule {}
