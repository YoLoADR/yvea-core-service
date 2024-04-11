import { Language } from '@libs/constants';
import { Public } from '@libs/decorators';
import { Controller, Get, Param, Query } from '@nestjs/common';
import {
  ApiCookieAuth,
  ApiHeader,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  CountryAuthorityDto,
  CountryCertifiableCodeDto,
  CountryDetailsDto,
  CountryItemDto,
} from '../dto';
import { CountriesService } from '../services';

@ApiTags('Countries')
@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @ApiOperation({
    summary: 'Get List of Countries',
    description:
      "This endpoint retrieves a list of countries. The name of each country is automatically translated based on the user's browser settings, providing a localized experience.",
  })
  @ApiHeader({ name: 'accept-language', enum: Language })
  @Public()
  @ApiOkResponse({ type: CountryItemDto, isArray: true })
  @Get()
  async findAll(): Promise<CountryItemDto[]> {
    const entities = await this.countriesService.findAll();

    return entities.map((entity) => new CountryItemDto(entity));
  }

  @ApiOperation({
    summary: 'Get List of Certifiable Codes for a Country',
    description:
      'This endpoint provides a list of certifiable codes associated with a specific country. These codes are used for certification purposes within the country.',
  })
  @ApiCookieAuth()
  @ApiOkResponse({ type: CountryCertifiableCodeDto, isArray: true })
  @Get(':id/codes')
  async getCertifiableCodes(
    @Param('id') id: string,
    @Query('code') code: string,
  ): Promise<CountryCertifiableCodeDto[]> {
    const entities = await this.countriesService.getCertifiableCodes(id, code);

    return entities.map((entity) => new CountryCertifiableCodeDto(entity));
  }

  @ApiOperation({
    summary: 'Get Country Details',
    description:
      'This endpoint retrieves detailed information about a specific country, including its geographical, demographic, and cultural attributes.',
  })
  @ApiHeader({ name: 'accept-language', enum: Language })
  @ApiCookieAuth()
  @ApiOkResponse({ type: CountryDetailsDto })
  @Get(':id/details')
  async getDetails(@Param('id') id: string): Promise<CountryDetailsDto> {
    const entity = await this.countriesService.getDetails(id);

    return new CountryDetailsDto(entity);
  }

  @ApiOperation({
    summary: 'Get List of Authorities for a Country',
    description:
      'This endpoint provides a list of authorities and governing bodies associated with a specific country. It includes information about government agencies, institutions, and organizations that have authority within the country.',
  })
  @ApiCookieAuth()
  @ApiOkResponse({ type: CountryAuthorityDto, isArray: true })
  @Get(':id/authorities')
  async findAuthoritiesByCountry(
    @Param('id') id: string,
  ): Promise<CountryAuthorityDto[]> {
    const entities = await this.countriesService.findAuthoritiesByCountry(id);

    return entities.map((entity) => new CountryAuthorityDto(entity));
  }

  @ApiOperation({
    summary: 'Get List of All Authorities',
    description:
      'This endpoint retrieves a comprehensive list of all authorities, governing bodies, and organizations. It includes information about government agencies, institutions, and organizations with various areas of authority and responsibility.',
  })
  @ApiHeader({ name: 'accept-language', enum: Language })
  @ApiCookieAuth()
  @ApiOkResponse({ type: CountryAuthorityDto, isArray: true })
  @Get('authorities')
  async findAllAuthorities(): Promise<CountryAuthorityDto[]> {
    const entities = await this.countriesService.findAllAuthorities();

    return entities.map((entity) => new CountryAuthorityDto(entity));
  }
}
