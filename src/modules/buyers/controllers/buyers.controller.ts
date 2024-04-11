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
import { BuyerDto, CreateBuyerDto } from '../dto';
import { BuyersService } from '../services';

@ApiTags('Buyers')
@ApiCookieAuth()
@Controller('buyers')
export class BuyersController {
  constructor(private readonly buyersService: BuyersService) {}

  @ApiOperation({
    summary: 'Get Buyers Associated with the Calling User',
    description:
      "This endpoint retrieves a list of buyers associated with the user making the request. It provides information about buyers linked to the calling user's account.",
  })
  @ApiPaginatedResponse(BuyerDto)
  @Get()
  async findAll(
    @Req() { user }: RequestWithUser,
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<BuyerDto>> {
    const [entities, itemCount] = await this.buyersService.findAll(
      user,
      pageOptionsDto,
    );

    return new PageDto(
      entities.map((entity) => new BuyerDto(entity)),
      { itemCount, pageOptionsDto },
    );
  }

  @ApiOperation({
    summary: 'Get Buyer Information',
    description:
      'This endpoint retrieves detailed information about a specific buyer. Users can request information about a particular buyer by providing their unique identifier.',
  })
  @ApiOkResponse({ type: BuyerDto })
  @Get(':id')
  async findOne(
    @Req() { user }: RequestWithUser,
    @Param('id') id: number,
  ): Promise<BuyerDto> {
    const entity = await this.buyersService.findOne(user, id);

    return new BuyerDto(entity);
  }

  @ApiOperation({
    summary: 'Create Buyer',
    description:
      'This endpoint enables users to create a new buyer profile. Users can provide the necessary information to create a buyer account.',
  })
  @ApiOkResponse({ type: BuyerDto })
  @Post()
  async create(
    @Req() { user }: RequestWithUser,
    @Body() dto: CreateBuyerDto,
  ): Promise<BuyerDto> {
    const entity = await this.buyersService.create(user, dto);

    return new BuyerDto(entity);
  }

  @ApiOperation({
    summary: 'Update Existing Buyer',
    description:
      "This endpoint allows users to update an existing buyer profile. Users can modify and save changes to the buyer's information.",
  })
  @ApiOkResponse({ type: BuyerDto })
  @Put(':id')
  async update(
    @Req() { user }: RequestWithUser,
    @Param('id') id: number,
    @Body() dto: CreateBuyerDto,
  ): Promise<BuyerDto> {
    const entity = await this.buyersService.update(user, id, dto);

    return new BuyerDto(entity);
  }
}
