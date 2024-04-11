import { Injectable } from '@nestjs/common';
import { Category } from '../../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async findAll(): Promise<Category[]> {
    return this.categoryRepository.find({
      relations: {
        partners: true,
      },
      order: {
        name: 'ASC',
      },
    });
  }

  async upsertMany(
    categories: Category[],
  ): Promise<InsertResult> {
    return this.categoryRepository.createQueryBuilder()
      .insert()
      .into(Category)
      .values(categories)
      .orIgnore()
      .execute();
  }
}
