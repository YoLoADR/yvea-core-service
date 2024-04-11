import { Controller, Get } from '@nestjs/common';
import {
  ApiCookieAuth,
  ApiTags,
  ApiOperation,
  ApiOkResponse,
} from '@nestjs/swagger';
import { CategoriesService } from '../../services/categories/categories.service';
import { Public } from '@libs/decorators';
import { CategoryDto } from '../../dto/response/category.dto';

@ApiTags('Categories')
@ApiCookieAuth()
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoryService: CategoriesService) {}

  @ApiOperation({
    summary: 'Get List of Categories',
    description: 'This endpoint retrieves a list of categories of Marketplace',
  })
  @Public()
  @ApiOkResponse({ type: CategoryDto, isArray: true })
  @Get()
  async findAll(): Promise<CategoryDto[]> {
    const entities = await this.categoryService.findAll();

    return entities.map((entity) => new CategoryDto(entity));
  }
}
