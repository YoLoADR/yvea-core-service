import { PartnersService } from '../../services/partners/partners.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCookieAuth,
  ApiHeader,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Public } from '@libs/decorators';
import { CreatePartnerDto, PartnerDto, UpdatePartnerDto } from '../../dto';

@ApiTags('Partners')
@ApiCookieAuth()
@Controller('partners')
export class PartnersController {
  constructor(private readonly partnerService: PartnersService) {}

  @ApiOperation({
    summary: 'Get List of Partners',
    description: 'This endpoint retrieves a list of partners',
  })
  @Public()
  @ApiOkResponse({ type: PartnerDto, isArray: true })
  @Get()
  async findAll(): Promise<PartnerDto[]> {
    const entities = await this.partnerService.findAll();

    return entities.map((entity) => new PartnerDto(entity));
  }

  @ApiOperation({
    summary: 'Get Partner Details',
    description:
      'This endpoint retrieves detailed information about a specific partner',
  })
  @Public()
  @ApiOkResponse({ type: PartnerDto })
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<any> {
    const entity = await this.partnerService.findOne(id);

    return new PartnerDto(entity);
  }

  @ApiOperation({
    summary: 'Create Partner',
    description: 'This endpoint creates a new partner.',
  })
  @ApiBody({ type: CreatePartnerDto })
  @ApiOkResponse({ type: PartnerDto })
  @Post()
  async create(@Body() payload: CreatePartnerDto): Promise<PartnerDto> {
    const entity = await this.partnerService.create(payload);

    return new PartnerDto(entity);
  }

  @ApiOperation({
    summary: 'Update Partner',
    description: 'This endpoint updates a partner.',
  })
  @ApiBody({ type: UpdatePartnerDto })
  @ApiOkResponse({ type: PartnerDto })
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() payload: UpdatePartnerDto,
  ): Promise<PartnerDto> {
    const entity = await this.partnerService.update(id, payload);

    return new PartnerDto(entity);
  }

  @ApiOperation({
    summary: 'Delete Partner',
    description: 'This endpoint enables users to delete a partner.',
  })
  @Delete(':id')
  async delete(@Param('id') id: number) {
    await this.partnerService.delete(id);
  }
}
