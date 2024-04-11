import { PageOptionsDto } from '@libs/dto';
import { JWTPayload } from '@libs/interfaces';
import { CountriesService } from '@modules/countries/services';
import { Injectable, NotFoundException } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { DeepPartial, EntityManager } from 'typeorm';
import { CreateSellerDto } from '../dto';
import { Seller } from '../entities';

@Injectable()
export class SellersService {
  constructor(
    private readonly countriesService: CountriesService,
    private readonly i18n: I18nService,
  ) {}

  async update(
    user: JWTPayload,
    id: number,
    dto: CreateSellerDto,
  ): Promise<Seller> {
    await this.findOne(user, id);

    await Seller.update({ id }, dto);

    return this.findOne(user, id);
  }

  async create(
    { sub: userId }: JWTPayload,
    dto: CreateSellerDto,
    manager?: EntityManager,
  ): Promise<Seller> {
    const data: DeepPartial<Seller> = {
      ...dto,
      userId,
    };

    if (manager) {
      return manager.save(Seller, data);
    }

    return Seller.save<Seller>(data);
  }

  async findOne({ sub: userId }: JWTPayload, id: number): Promise<Seller> {
    try {
      return await Seller.findOneByOrFail({ userId, id });
    } catch (_) {
      throw new NotFoundException(this.i18n.t('SELLER_NOT_FOUND'));
    }
  }

  async findAll(
    { sub: userId }: JWTPayload,
    { skip, take }: PageOptionsDto,
  ): Promise<[Seller[], number]> {
    return Seller.findAndCount({
      where: { userId },
      order: { name: 'ASC' },
      skip,
      take,
    });
  }
}
