import { ApiPaginatedResponse, Public } from '@libs/decorators';
import { PageDto, PageOptionsDto } from '@libs/dto';
import { RequestWithUser } from '@libs/types';
import { AdminGuard } from '@modules/auth/guards';
import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiCookieAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateUserDto, UserDto } from '../dto';
import { UsersService } from '../services';

@ApiTags('Users')
@ApiCookieAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @ApiOperation({
    summary: 'Get User Profile',
    description:
      'This endpoint allows the authenticated user to obtain his own profile information.',
  })
  @ApiOkResponse({ type: UserDto })
  @Get()
  async findOne(@Req() { user }: RequestWithUser): Promise<UserDto> {
    const entity = await this.usersService.findOne(user);

    return new UserDto(entity);
  }

  @ApiOperation({
    summary: 'Get List of Customer Users (Admin Only)',
    description:
      'This endpoint returns a list of all customer users. It is accessible only by administrators.',
  })
  @ApiPaginatedResponse(UserDto)
  @UseGuards(AdminGuard)
  @Get('all')
  async findAll(
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<UserDto>> {
    const [entities, itemCount] = await this.usersService.findAll(
      pageOptionsDto,
    );

    return new PageDto(
      entities.map((entity) => new UserDto(entity)),
      { itemCount, pageOptionsDto },
    );
  }

  @ApiOperation({
    summary: 'Get Customer User By ID (Admin Only)',
    description:
      'This endpoint returns a customer user by ID. It is accessible only by administrators.',
  })
  @ApiPaginatedResponse(UserDto)
  // TODO : @UseGuards(AdminGuard)
  @Public()
  @Get(':id')
  async findById(@Param('id') sub: number): Promise<UserDto> {
    const entity = await this.usersService.findOne({ sub });

    return new UserDto(entity);
  }

  @ApiOperation({
    summary: 'Update User Profile',
    description:
      "This endpoint allows the authenticated user to update their own profile information. In addition, it enables the user to update their associated company's information if applicable.",
  })
  @ApiOkResponse({ type: UserDto })
  @Put()
  async update(
    @Req() { user }: RequestWithUser,
    @Body() dto: UpdateUserDto,
  ): Promise<UserDto> {
    const entity = await this.usersService.update(user, dto);

    return new UserDto(entity);
  }
}
