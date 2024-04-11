import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Partner } from '../../entities/partner.entity';
import { Repository } from 'typeorm';
import { CreatePartnerDto, UpdatePartnerDto } from '../../dto';
import { Category } from '../../entities';

@Injectable()
export class PartnersService {
  constructor(
    @InjectRepository(Partner)
    private readonly partnerRepository: Repository<Partner>,
  ) {}

  async findAll(): Promise<Partner[]> {
    return this.partnerRepository.find({
      relations: ['categories'],
      order: {
        name: 'ASC',
      },
    });
  }

  async findOne(id: number): Promise<Partner | null> {
    await this.existsOrThrow(id);
    return this.partnerRepository.findOne({
      relations: ['categories'],
      where: { id },
    });
  }

  async create(dto: CreatePartnerDto): Promise<Partner> {
    const instance = this.partnerRepository.create({
      ...dto,
      categories: dto.categories.map(
        (category) => ({ id: category } as unknown as Category),
      ),
    });

    return this.partnerRepository.save(instance);
  }

  async update(id: number, dto: UpdatePartnerDto): Promise<Partner> {
    await this.existsOrThrow(id);

    const partner = await this.findOne(id);

    return this.partnerRepository.save({
      ...partner,
      ...dto,
      categories:
        dto.categories?.map(
          (category) => ({ id: category } as unknown as Category),
        ) || undefined,
    });
  }

  async delete(id: number): Promise<void> {
    await this.existsOrThrow(id);

    const res = await this.partnerRepository.delete(id);

    if (res.affected === 0)
      throw new InternalServerErrorException('Partner not deleted');

    return;
  }

  async existsOrThrow(id: number) {
    if (!(await this.partnerRepository.countBy({ id }))) {
      throw new NotFoundException('Partner not found');
    }
  }
}
