import { Language } from '@libs/constants';
import { Controller, Get } from '@nestjs/common';
import {
  ApiCookieAuth,
  ApiHeader,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CompanyTypeDto } from '../dto';
import { CompaniesService } from '../services';

@ApiTags('Companies')
@ApiCookieAuth()
@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @ApiOperation({
    summary: 'Get List of Company Types',
    description:
      "This endpoint retrieves a list of company types. The name of each type is automatically translated based on the user's browser settings, providing a localized experience.",
  })
  @ApiHeader({ name: 'accept-language', enum: Language })
  @ApiOkResponse({ type: CompanyTypeDto, isArray: true })
  @Get('types')
  async findTypes(): Promise<CompanyTypeDto[]> {
    const entities = await this.companiesService.findTypes();

    return entities.map((entity) => new CompanyTypeDto(entity));
  }
}
