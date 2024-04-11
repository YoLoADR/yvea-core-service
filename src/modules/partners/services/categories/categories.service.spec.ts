import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesService } from './categories.service';
import { Category, Partner } from '../../entities';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createMock } from '@golevelup/ts-jest';

describe('CategoriesService', () => {
  let service: CategoriesService;
  let categoryRepository: Repository<Category>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        {
          provide: getRepositoryToken(Category),
          useValue: createMock<Repository<Partner>>(),
        },
      ],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
    categoryRepository = module.get<Repository<Category>>(
      getRepositoryToken(Category),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of categories', async () => {
      const categoriesMock: Category[] = [
        { id: 'DIGITAL_SOLUTIONS', name: 'Category 1', partners: [] },
        { id: 'QUALITY_ASSURANCE', name: 'Category 2', partners: [] },
      ];
      jest.spyOn(categoryRepository, 'find').mockResolvedValue(categoriesMock);

      const categories = await service.findAll();

      expect(categories).toBeInstanceOf(Array);
      expect(categories).toHaveLength(2);
      expect(categories).toEqual(categoriesMock);
      expect(categoryRepository.find).toHaveBeenCalledWith({
        relations: {
          partners: true,
        },
        order: {
          name: 'ASC',
        },
      });
    });

    it('should return categories with partners', async () => {
      const categoriesMock: Category[] = [
        {
          id: 'DIGITAL_SOLUTIONS',
          name: 'Category 1',
          partners: [new Partner(), new Partner()],
        },
      ];
      jest.spyOn(categoryRepository, 'find').mockResolvedValue(categoriesMock);

      const categories = await service.findAll();

      expect(categories[0].partners).toBeDefined();
    });

    it('should return categories in ascending order by name', async () => {
      const categoriesMock: Category[] = [
        { id: 'DIGITAL_SOLUTIONS', name: 'Category 1', partners: [] },
        { id: 'QUALITY_ASSURANCE', name: 'Category 2', partners: [] },
      ];
      jest.spyOn(categoryRepository, 'find').mockResolvedValue(categoriesMock);

      
      const categories = await service.findAll();
      const sortedCategories = categories.sort((a, b) =>
        a.name.localeCompare(b.name),
      );
      expect(categories).toEqual(sortedCategories);
    });
  });
});
