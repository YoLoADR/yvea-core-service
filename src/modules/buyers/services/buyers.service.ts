import { PageOptionsDto } from '@libs/dto';
import { JWTPayload } from '@libs/interfaces';
import { CountriesService } from '@modules/countries/services';
import { Injectable, NotFoundException } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { DeepPartial, EntityManager } from 'typeorm';
import { CreateBuyerDto } from '../dto';
import { Buyer } from '../entities';

@Injectable()
export class BuyersService {
  constructor(
    private readonly countriesService: CountriesService,
    private readonly i18n: I18nService,
  ) {}

  async update(
    user: JWTPayload,
    id: number,
    dto: CreateBuyerDto,
  ): Promise<Buyer> {
    await this.findOne(user, id);

    await Buyer.update({ id }, dto);

    return this.findOne(user, id);
  }

  async create(
    { sub: userId }: JWTPayload,
    dto: CreateBuyerDto,
    manager?: EntityManager,
  ): Promise<Buyer> {
    const data: DeepPartial<Buyer> = {
      ...dto,
      userId,
    };

    if (manager) {
      return manager.save(Buyer, data);
    }

    return Buyer.save<Buyer>(data);
  }

  async findOne({ sub: userId }: JWTPayload, id: number): Promise<Buyer> {
    try {
      return await Buyer.findOneByOrFail({ userId, id });
    } catch (_) {
      throw new NotFoundException(this.i18n.t('BUYER_NOT_FOUND'));
    }
  }

  async findAll(
    { sub: userId }: JWTPayload,
    { skip, take }: PageOptionsDto,
  ): Promise<[Buyer[], number]> {
    return Buyer.findAndCount({
      where: { userId },
      order: { name: 'ASC' },
      skip,
      take,
    });
  }
}
