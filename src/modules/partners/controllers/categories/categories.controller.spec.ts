import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from './categories.controller';
import { createMock } from '@golevelup/ts-jest';
import { CategoriesService } from '../../services/categories/categories.service';

describe('CategoriesController', () => {
  let controller: CategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [
        {
          provide: 'CategoriesService',
          useValue: createMock<CategoriesService>(),
        },
      ],
    }).compile();

    controller = module.get<CategoriesController>(CategoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
