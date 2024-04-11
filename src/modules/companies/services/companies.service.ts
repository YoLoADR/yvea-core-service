import { I18nUtilsService } from '@libs/i18n/services';
import { User } from '@modules/users/entities';
import { Injectable, NotFoundException } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { EntityManager } from 'typeorm';
import { CreateCompanyDto } from '../dto';
import { Company, CompanyType } from '../entities';

@Injectable()
export class CompaniesService {
  constructor(
    private readonly i18n: I18nService,
    private readonly i18nUtils: I18nUtilsService,
  ) {}

  async findTypes(): Promise<CompanyType[]> {
    return CompanyType.find({
      order: { id: 'ASC' },
      select: { id: true, nameEn: true, nameFr: this.i18nUtils.isFrench() },
    });
  }

  async create(
    { type: typeId, ...dto }: CreateCompanyDto,
    user: User,
    manager: EntityManager,
  ): Promise<Company> {
    await this.typeExistsOrThrow(typeId);

    return manager.save(Company, { ...dto, typeId, user });
  }

  async typeExistsOrThrow(id: string) {
    if (!(await CompanyType.countBy({ id }))) {
      throw new NotFoundException(this.i18n.t('COMPANY_TYPE_NOT_FOUND'));
    }
  }
}
