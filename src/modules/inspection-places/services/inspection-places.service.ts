import { PageOptionsDto } from '@libs/dto';
import { JWTPayload } from '@libs/interfaces';
import { CountriesService } from '@modules/countries/services';
import { Injectable, NotFoundException } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { DeepPartial, EntityManager } from 'typeorm';
import { CreateInspectionPlaceDto } from '../dto';
import { InspectionPlace } from '../entities';

@Injectable()
export class InspectionPlacesService {
  constructor(
    private readonly countriesService: CountriesService,
    private readonly i18n: I18nService,
  ) {}

  async update(
    user: JWTPayload,
    id: number,
    dto: CreateInspectionPlaceDto,
  ): Promise<InspectionPlace> {
    await this.findOne(user, id);

    await InspectionPlace.update({ id }, dto);

    return this.findOne(user, id);
  }

  async create(
    { sub: userId }: JWTPayload,
    dto: CreateInspectionPlaceDto,
    manager?: EntityManager,
  ): Promise<InspectionPlace> {
    const data: DeepPartial<InspectionPlace> = {
      ...dto,
      userId,
    };

    if (manager) {
      return manager.save(InspectionPlace, data);
    }

    return InspectionPlace.save<InspectionPlace>(data);
  }

  async findOne(
    { sub: userId }: JWTPayload,
    id: number,
  ): Promise<InspectionPlace> {
    try {
      return await InspectionPlace.findOneByOrFail({ userId, id });
    } catch (_) {
      throw new NotFoundException(this.i18n.t('INSPECTION_PLACE_NOT_FOUND'));
    }
  }

  async findAll(
    { sub: userId }: JWTPayload,
    { skip, take }: PageOptionsDto,
  ): Promise<[InspectionPlace[], number]> {
    return InspectionPlace.findAndCount({
      where: { userId },
      order: { name: 'ASC' },
      skip,
      take,
    });
  }
}
