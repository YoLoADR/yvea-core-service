import { Language, Order } from '@libs/constants';
import { ApiPaginatedResponse } from '@libs/decorators';
import { PageDto, PageOptionsDto } from '@libs/dto';
import { RequestWithUser } from '@libs/types';
import { AdminGuard } from '@modules/auth/guards';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiCookieAuth,
  ApiHeader,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import {
  CertificateDto,
  CertificateMethodDto,
  CertificateNomenclatureCodeDto,
  CertificateProductConditionDto,
  CertificateProductSizeUnitDto,
  UpdateCertificateDto,
} from '../dto';
import { CertificatesService } from '../services';

@ApiTags('Certificates')
@ApiCookieAuth()
@Controller('certificates')
export class CertificatesController {
  constructor(private readonly certificatesService: CertificatesService) {}

  @ApiOperation({
    summary: 'Get All Certificates Documents By Certificates (Admin Only)',
    description:
      'This endpoint is reserved for administrators and allows them to retrieve a list of all certificates documents by certificates stored in the system.',
  })
  @ApiPaginatedResponse(CertificateDto)
  @UseGuards(AdminGuard)
  @Get('documents/all')
  async findAllDocumentsByCertificates(
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<CertificateDto>> {
    const [entities, itemCount] =
      await this.certificatesService.findAllDocumentsByCertificates(
        pageOptionsDto,
      );

    return new PageDto(
      entities.map((entity) => new CertificateDto(entity)),
      { itemCount, pageOptionsDto },
    );
  }

  @ApiOperation({
    summary: 'Get Certificates Documents By Certificates',
    description:
      'Retrieve a list of all certificates documents by certificates associated with their account. It provides access to certificates that belong to the user who makes the request.',
  })
  @ApiPaginatedResponse(CertificateDto)
  @Get('documents')
  async findByUserDocumentsByCertificates(
    @Req() { user }: RequestWithUser,
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<CertificateDto>> {
    const [entities, itemCount] =
      await this.certificatesService.findAllDocumentsByCertificates(
        pageOptionsDto,
        user,
      );

    return new PageDto(
      entities.map((entity) => new CertificateDto(entity)),
      { itemCount, pageOptionsDto },
    );
  }

  @ApiOperation({
    summary:
      'Get All Certificates Documents By Nomenclature Codes (Admin Only)',
    description:
      'This endpoint is reserved for administrators and allows them to retrieve a list of all certificates documents by nomenclature codes stored in the system.',
  })
  @ApiPaginatedResponse(CertificateNomenclatureCodeDto)
  @UseGuards(AdminGuard)
  @Get('nomenclature-codes/documents/all')
  async findAllDocumentsByNomenclatureCodes(
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<CertificateNomenclatureCodeDto>> {
    const [entities, itemCount] =
      await this.certificatesService.findAllDocumentsByNomenclatureCodes(
        pageOptionsDto,
      );

    return new PageDto(
      entities.map((entity) => new CertificateNomenclatureCodeDto(entity)),
      { itemCount, pageOptionsDto },
    );
  }

  @ApiOperation({
    summary: 'Get Certificates Documents By Nomenclature Codes',
    description:
      'Retrieve a list of all certificates documents by nomenclature codes associated with their account. It provides access to certificates that belong to the user who makes the request.',
  })
  @ApiPaginatedResponse(CertificateNomenclatureCodeDto)
  @Get('nomenclature-codes/documents')
  async findByUserDocumentsByNomenclatureCodes(
    @Req() { user }: RequestWithUser,
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<CertificateNomenclatureCodeDto>> {
    const [entities, itemCount] =
      await this.certificatesService.findAllDocumentsByNomenclatureCodes(
        pageOptionsDto,
        user,
      );

    return new PageDto(
      entities.map((entity) => new CertificateNomenclatureCodeDto(entity)),
      { itemCount, pageOptionsDto },
    );
  }

  @ApiOperation({
    summary: 'Get All Certificates Documents By User ID (Admin Only)',
    description:
      'This endpoint is reserved for administrators and allows them to retrieve a list of all certificates documents by user ID stored in the system.',
  })
  @ApiPaginatedResponse(CertificateDto)
  @UseGuards(AdminGuard)
  @Get('users/:id/documents/all')
  async findAllDocumentsByUser(
    @Query() pageOptionsDto: PageOptionsDto,
    @Param('id') sub: number,
  ): Promise<PageDto<CertificateDto>> {
    const [entities, itemCount] =
      await this.certificatesService.findAllDocumentsByCertificates(
        pageOptionsDto,
        { sub },
      );

    return new PageDto(
      entities.map((entity) => new CertificateDto(entity)),
      { itemCount, pageOptionsDto },
    );
  }

  @ApiOperation({
    summary: 'Get All Certificates By User ID (Admin Only)',
    description:
      'This endpoint is reserved for administrators and allows them to retrieve a list of all certificates by user ID stored in the system.',
  })
  @ApiQuery({
    name: 'status',
    type: 'string',
    required: false,
  })
  @ApiQuery({
    name: 'sort_by_status',
    type: 'enum',
    enum: Order,
    required: false,
  })
  @ApiPaginatedResponse(CertificateDto)
  @UseGuards(AdminGuard)
  @Get('users/:id/all')
  async findAllByUser(
    @Query() pageOptionsDto: PageOptionsDto,
    @Param('id') sub: number,
    @Query('sort_by_status') sortByStatus?: Order,
    @Query('status') status?: string,
  ): Promise<PageDto<CertificateDto>> {
    const [entities, itemCount] = await this.certificatesService.findByUser(
      { sub },
      pageOptionsDto,
      sortByStatus,
      status,
    );

    return new PageDto(
      entities.map((entity) => new CertificateDto(entity)),
      { itemCount, pageOptionsDto },
    );
  }

  @ApiOperation({
    summary: 'Get All Certificates (Admin Only)',
    description:
      'This endpoint is reserved for administrators and allows them to retrieve a list of all certificates stored in the system. It provides access to a comprehensive list of certificates for administrative purposes.',
  })
  @ApiQuery({
    name: 'sort_by_status',
    type: 'enum',
    enum: Order,
    required: false,
  })
  @ApiPaginatedResponse(CertificateDto)
  @UseGuards(AdminGuard)
  @Get('all')
  async findAll(
    @Query() pageOptionsDto: PageOptionsDto,
    @Query('sort_by_status') sortByStatus?: Order,
  ): Promise<PageDto<CertificateDto>> {
    const [entities, itemCount] = await this.certificatesService.findAll(
      pageOptionsDto,
      sortByStatus,
    );

    return new PageDto(
      entities.map((entity) => new CertificateDto(entity)),
      { itemCount, pageOptionsDto },
    );
  }

  @ApiOperation({
    summary: "Get User's Certificates",
    description:
      'This endpoint allows a user to retrieve a list of certificates associated with their account. It provides access to certificates that belong to the user who makes the request.',
  })
  @ApiQuery({
    name: 'status',
    type: 'string',
    required: false,
  })
  @ApiQuery({
    name: 'sort_by_status',
    type: 'enum',
    enum: Order,
    required: false,
  })
  @ApiPaginatedResponse(CertificateDto)
  @Get()
  async findByUser(
    @Req() { user }: RequestWithUser,
    @Query() pageOptionsDto: PageOptionsDto,
    @Query('sort_by_status') sortByStatus?: Order,
    @Query('status') status?: string,
  ): Promise<PageDto<CertificateDto>> {
    const [entities, itemCount] = await this.certificatesService.findByUser(
      user,
      pageOptionsDto,
      sortByStatus,
      status,
    );

    return new PageDto(
      entities.map((entity) => new CertificateDto(entity)),
      { itemCount, pageOptionsDto },
    );
  }

  @ApiOperation({
    summary: 'Get All Incoterms',
    description:
      "This endpoint provides a list of Incoterms used in international trade. The names of each Incoterm are automatically translated based on the user's browser settings, allowing for a localized experience.",
  })
  @ApiOkResponse({ type: String, isArray: true })
  @Get('incoterms')
  async findAllIncoterms(): Promise<string[]> {
    const entities = await this.certificatesService.findAllIncoterms();

    return entities.map(({ name }) => name);
  }

  @ApiOperation({
    summary: 'Get All Status',
    description: 'This endpoint provides a list of potential status.',
  })
  @ApiOkResponse({ type: String, isArray: true })
  @Get('status')
  async findAllStatus(): Promise<string[]> {
    const entities = await this.certificatesService.findAllStatus();

    return entities.map(({ name }) => name);
  }

  @ApiOperation({
    summary: 'Get All Methods',
    description:
      "This endpoint provides a list of certification methods. The names of each certification method are automatically translated based on the user's browser settings, allowing for a localized experience.",
  })
  @ApiHeader({ name: 'accept-language', enum: Language })
  @ApiOkResponse({ type: CertificateMethodDto, isArray: true })
  @Get('methods')
  async findAllMethods(): Promise<CertificateMethodDto[]> {
    const entities = await this.certificatesService.findAllMethods();

    return entities.map((entity) => new CertificateMethodDto(entity));
  }

  @ApiOperation({
    summary: 'Get Product Conditions',
    description:
      "This endpoint provides a list of possible conditions for products. The names of each condition are automatically translated according to the user's browser settings, ensuring a localized user experience.",
  })
  @ApiHeader({ name: 'accept-language', enum: Language })
  @ApiOkResponse({ type: CertificateProductConditionDto, isArray: true })
  @Get('products/conditions')
  async findAllProductConditions(): Promise<CertificateProductConditionDto[]> {
    const entities = await this.certificatesService.findAllProductConditions();

    return entities.map((entity) => new CertificateProductConditionDto(entity));
  }

  @ApiOperation({
    summary: 'Get Product Measurement Units',
    description:
      "This endpoint provides a list of potential measurement units for products. The names of each unit are automatically translated based on the user's browser settings, ensuring a localized user experience.",
  })
  @ApiHeader({ name: 'accept-language', enum: Language })
  @ApiOkResponse({ type: CertificateProductSizeUnitDto, isArray: true })
  @Get('products/size-units')
  async findAllProductSizeUnits(): Promise<CertificateProductSizeUnitDto[]> {
    const entities = await this.certificatesService.findAllProductSizeUnits();

    return entities.map((entity) => new CertificateProductSizeUnitDto(entity));
  }

  @ApiOperation({
    summary: 'Get Certificate Information',
    description:
      'This endpoint retrieves detailed information about a specific certificate. Users can request information about a particular certificate by providing its unique identifier.',
  })
  @ApiOkResponse({ type: CertificateDto })
  @Get(':id')
  async findOne(
    @Req() { user }: RequestWithUser,
    @Param('id') id: number,
  ): Promise<CertificateDto> {
    const entity = await this.certificatesService.findOne(id, user);

    return new CertificateDto(entity);
  }

  @ApiOperation({
    summary: 'Create Empty Certificate and Get ID',
    description:
      'This endpoint allows users to create an empty certificate. After successful creation, it returns the unique ID of the newly created certificate.',
  })
  @ApiOkResponse({ type: CertificateDto })
  @Post()
  async create(@Req() { user }: RequestWithUser): Promise<CertificateDto> {
    const entity = await this.certificatesService.create(user);

    return new CertificateDto(entity);
  }

  @ApiOperation({
    summary: 'Update Certificate with Flexible Field Modification',
    description:
      'This endpoint enables users to update a certificate, allowing modifications to any field. It is useful throughout the creation and modification stages, allowing users to save intermediate stages of their certification.',
  })
  @ApiOkResponse({ type: CertificateDto })
  @Put(':id')
  async update(
    @Req() { user }: RequestWithUser,
    @Param('id') id: number,
    @Body() dto: UpdateCertificateDto,
  ): Promise<CertificateDto> {
    const entity = await this.certificatesService.update(id, user, dto);

    return new CertificateDto(entity);
  }

  @ApiOperation({
    summary: 'Delete Certificate',
    description: 'This endpoint enables users to delete a certificate.',
  })
  @ApiOkResponse({ type: CertificateDto })
  @Delete(':id')
  async delete(@Req() { user }: RequestWithUser, @Param('id') id: number) {
    await this.certificatesService.delete(id, user);
  }
}
