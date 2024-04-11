import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountriesController } from './controllers';
import {
  Country,
  CountryAuthority,
  CountryCertifiableCode,
  CountryCertificateCalculationByCoefficientWithMax,
  CountryCertificateCalculationByRange,
  CountryCurrency,
  CountryRegisteredCertificationAuthority,
  CountryRequiredDocument,
  CountryRequiredDocumentByCertificate,
  CountryRequiredDocumentByCode,
} from './entities';
import { CountriesService } from './services';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Country,
      CountryCurrency,
      CountryAuthority,
      CountryCertifiableCode,
      CountryRequiredDocument,
      CountryRequiredDocumentByCode,
      CountryCertificateCalculationByRange,
      CountryRequiredDocumentByCertificate,
      CountryRegisteredCertificationAuthority,
      CountryCertificateCalculationByCoefficientWithMax,
    ]),
  ],
  providers: [CountriesService],
  controllers: [CountriesController],
  exports: [CountriesService],
})
export class CountriesModule {}
