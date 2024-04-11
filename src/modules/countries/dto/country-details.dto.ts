import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Country } from '../entities';
import { CountryCertificateCalculationByRangeDto } from './country-certificate-calculation-by-coefficient-with-max.dto';
import { CountryCertificateCalculationByCoefficientWithMaxDto } from './country-certificate-calculation-by-range.dto';

export class CountryDetailsDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ type: String, isArray: true })
  registeredCertificationAuthorities: string[];

  @ApiProperty({ type: String, isArray: true })
  requiredDocumentsByCertificate: string[];

  @ApiProperty({ type: String, isArray: true })
  requiredDocumentsByCode: string[];

  @ApiPropertyOptional({ name: 'no_certification_required_below_threshold' })
  noCertificationRequiredBelowThreshold?: number;

  @ApiProperty()
  currency: string;

  @ApiPropertyOptional({
    name: 'certificate_calculation_by_range',
    type: CountryCertificateCalculationByRangeDto,
    isArray: true,
  })
  certificateCalculationByRange?: CountryCertificateCalculationByRangeDto[];

  @ApiPropertyOptional({
    name: 'certificate_calculation_by_coefficient_with_max',
  })
  certificateCalculationByCoefficientWithMax: CountryCertificateCalculationByCoefficientWithMaxDto;

  constructor(entity: Country) {
    this.id = entity.id;
    this.name = entity.nameFr || entity.nameEn;
    this.registeredCertificationAuthorities =
      entity.registeredCertificationAuthorities?.map(
        ({ authorityId }) => authorityId,
      );
    this.requiredDocumentsByCertificate =
      entity.requiredDocumentsByCertificate?.map(
        ({ documentId }) => documentId,
      );
    this.requiredDocumentsByCode = entity.requiredDocumentsByCode?.map(
      ({ documentId }) => documentId,
    );
    this.noCertificationRequiredBelowThreshold =
      entity.noCertificationRequiredBelowThreshold ?? undefined;
    this.currency = entity.currencyId;
    this.certificateCalculationByRange = entity.certificateCalculationByRange
      .length
      ? entity.certificateCalculationByRange.map(
          (ccbr) => new CountryCertificateCalculationByRangeDto(ccbr),
        )
      : undefined;
    this.certificateCalculationByCoefficientWithMax =
      entity.certificateCalculationByCoefficientWithMax
        ? new CountryCertificateCalculationByCoefficientWithMaxDto(
            entity.certificateCalculationByCoefficientWithMax,
          )
        : undefined;
  }
}
