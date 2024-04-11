import { ApiPaginatedResponse } from '@libs/decorators';
import { PageDto, PageOptionsDto } from '@libs/dto';
import { RequestWithUser } from '@libs/types';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import {
  ApiCookieAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateInspectionPlaceDto, InspectionPlaceDto } from '../dto';
import { InspectionPlacesService } from '../services';

@ApiTags('Inspection Places')
@ApiCookieAuth()
@Controller('inspection-places')
export class InspectionPlacesController {
  constructor(
    private readonly inspectionPlacesService: InspectionPlacesService,
  ) {}

  @ApiOperation({
    summary: 'Get Inspection Places Associated with the Calling User',
    description:
      "This endpoint retrieves a list of inspection places associated with the user making the request. It provides information about inspection places linked to the calling user's account.",
  })
  @ApiPaginatedResponse(InspectionPlaceDto)
  @Get()
  async findAll(
    @Req() { user }: RequestWithUser,
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<InspectionPlaceDto>> {
    const [entities, itemCount] = await this.inspectionPlacesService.findAll(
      user,
      pageOptionsDto,
    );

    return new PageDto(
      entities.map((entity) => new InspectionPlaceDto(entity)),
      { itemCount, pageOptionsDto },
    );
  }

  @ApiOperation({
    summary: 'Get Inspection Place Information',
    description:
      'This endpoint retrieves detailed information about a specific inspection place. Users can request information about a particular inspection place by providing their unique identifier.',
  })
  @ApiOkResponse({ type: InspectionPlaceDto })
  @Get(':id')
  async findOne(
    @Req() { user }: RequestWithUser,
    @Param('id') id: number,
  ): Promise<InspectionPlaceDto> {
    const entity = await this.inspectionPlacesService.findOne(user, id);

    return new InspectionPlaceDto(entity);
  }

  @ApiOperation({
    summary: 'Create Inspection Place',
    description:
      'This endpoint enables users to create a new inspection place profile. Users can provide the necessary information to create a inspection place account.',
  })
  @ApiOkResponse({ type: InspectionPlaceDto })
  @Post()
  async create(
    @Req() { user }: RequestWithUser,
    @Body() dto: CreateInspectionPlaceDto,
  ): Promise<InspectionPlaceDto> {
    const entity = await this.inspectionPlacesService.create(user, dto);

    return new InspectionPlaceDto(entity);
  }

  @ApiOperation({
    summary: 'Update Existing Inspection Place',
    description:
      "This endpoint allows users to update an existing inspection place profile. Users can modify and save changes to the inspection place's information.",
  })
  @ApiOkResponse({ type: InspectionPlaceDto })
  @Put(':id')
  async update(
    @Req() { user }: RequestWithUser,
    @Param('id') id: number,
    @Body() dto: CreateInspectionPlaceDto,
  ): Promise<InspectionPlaceDto> {
    const entity = await this.inspectionPlacesService.update(user, id, dto);

    return new InspectionPlaceDto(entity);
  }
}
