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
import { CreateSellerDto, SellerDto } from '../dto';
import { SellersService } from '../services';

@ApiTags('Sellers')
@ApiCookieAuth()
@Controller('sellers')
export class SellersController {
  constructor(private readonly sellersService: SellersService) {}

  @ApiOperation({
    summary: 'Get Sellers Associated with the Calling User',
    description:
      "This endpoint retrieves a list of sellers associated with the user making the request. It provides information about sellers linked to the calling user's account.",
  })
  @ApiPaginatedResponse(SellerDto)
  @Get()
  async findAll(
    @Req() { user }: RequestWithUser,
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<SellerDto>> {
    const [entities, itemCount] = await this.sellersService.findAll(
      user,
      pageOptionsDto,
    );

    return new PageDto(
      entities.map((entity) => new SellerDto(entity)),
      { itemCount, pageOptionsDto },
    );
  }

  @ApiOperation({
    summary: 'Get Seller Information',
    description:
      'This endpoint retrieves detailed information about a specific seller. Users can request information about a particular seller by providing their unique identifier.',
  })
  @ApiOkResponse({ type: SellerDto })
  @Get(':id')
  async findOne(
    @Req() { user }: RequestWithUser,
    @Param('id') id: number,
  ): Promise<SellerDto> {
    const entity = await this.sellersService.findOne(user, id);

    return new SellerDto(entity);
  }

  @ApiOperation({
    summary: 'Create Seller',
    description:
      'This endpoint enables users to create a new seller profile. Users can provide the necessary information to create a seller account.',
  })
  @ApiOkResponse({ type: SellerDto })
  @Post()
  async create(
    @Req() { user }: RequestWithUser,
    @Body() dto: CreateSellerDto,
  ): Promise<SellerDto> {
    const entity = await this.sellersService.create(user, dto);

    return new SellerDto(entity);
  }

  @ApiOperation({
    summary: 'Update Existing Seller',
    description:
      "This endpoint allows users to update an existing seller profile. Users can modify and save changes to the seller's information.",
  })
  @ApiOkResponse({ type: SellerDto })
  @Put(':id')
  async update(
    @Req() { user }: RequestWithUser,
    @Param('id') id: number,
    @Body() dto: CreateSellerDto,
  ): Promise<SellerDto> {
    const entity = await this.sellersService.update(user, id, dto);

    return new SellerDto(entity);
  }
}
