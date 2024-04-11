import { I18nUtilsService } from '@libs/i18n/services';
import { Injectable, NotFoundException } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { Like } from 'typeorm';
import { Country, CountryAuthority, CountryCertifiableCode } from '../entities';

@Injectable()
export class CountriesService {
  constructor(
    private readonly i18n: I18nService,
    private readonly i18nUtils: I18nUtilsService,
  ) {}
  async findAll(): Promise<Country[]> {
    return Country.find({
      order: { id: 'ASC' },
      select: { id: true, nameEn: true, nameFr: this.i18nUtils.isFrench() },
    });
  }

  async getCertifiableCodes(
    id: string,
    code: string,
  ): Promise<CountryCertifiableCode[]> {
    return CountryCertifiableCode.find({
      where: { country: { id }, code: Like(`${code}%`) },
      order: { code: 'DESC' },
    });
  }

  async getDetails(id: string): Promise<Country> {
    try {
      return await Country.findOneOrFail({
        where: { id },
        select: {
          id: true,
          nameEn: true,
          nameFr: this.i18nUtils.isFrench(),
          noCertificationRequiredBelowThreshold: true,
          currencyId: true,
        },
        relations: {
          registeredCertificationAuthorities: true,
          requiredDocumentsByCertificate: true,
          requiredDocumentsByCode: true,
          certificateCalculationByRange: true,
          certificateCalculationByCoefficientWithMax: true,
        },
      });
    } catch (e) {
      console.log(e);
      throw new NotFoundException(this.i18n.t('COUNTRY_NOT_FOUND'));
    }
  }

  async existsOrThrow(id: string) {
    if (!(await Country.countBy({ id }))) {
      throw new NotFoundException(this.i18n.t('COUNTRY_NOT_FOUND'));
    }
  }

  async nomenclatureCodeExistsOrThrow(countryId: string, code: string) {
    if (!(await CountryCertifiableCode.countBy({ countryId, code }))) {
      throw new NotFoundException(this.i18n.t('COUNTRY_CERTIFIABLE_NOT_FOUND'));
    }
  }

  async findAllAuthorities() {
    return CountryAuthority.createQueryBuilder('ca')
      .leftJoin('ca.registeredCertificationAuthorities', 'rca')
      .leftJoin('rca.country', 'c')
      .select([
        'ca.id',
        'ca.name',
        'ca.email',
        'ca.phone',
        'ca.contact',
        'rca',
        'rca.country',
        'c.id',
        'c.nameEn',
        ...(this.i18nUtils.isFrench() ? ['c.nameFr'] : []),
      ])
      .orderBy('ca.id', 'ASC')
      .getMany();
  }

  async findAuthoritiesByCountry(
    countryId: string,
  ): Promise<CountryAuthority[]> {
    return CountryAuthority.find({
      order: { id: 'ASC' },
      where: { registeredCertificationAuthorities: { countryId } },
    });
  }
}
