import { Order } from '@libs/constants';
import { PageOptionsDto } from '@libs/dto';
import { I18nUtilsService } from '@libs/i18n/services';
import { JWTPayload } from '@libs/interfaces';
import { BuyersService } from '@modules/buyers/services';
import { CountriesService } from '@modules/countries/services';
import { InspectionPlacesService } from '@modules/inspection-places/services';
import { NotificationsService } from '@modules/notifications/services';
import { SellersService } from '@modules/sellers/services';
import { StorageService } from '@modules/storage/services';
import { UsersService } from '@modules/users/services';
import { Injectable, NotFoundException } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import {
  DataSource,
  DeleteResult,
  EntityManager,
  FindOptionsWhere,
  In,
  IsNull,
  Not,
  Raw,
  UpdateResult,
} from 'typeorm';
import {
  UpdateCertificateDto,
  UpdateCertificateNomenclatureCodeDto,
  UpdateCertificateProductDto,
} from '../dto';
import {
  Certificate,
  CertificateCustomAuthority,
  CertificateDocument,
  CertificateIncoterm,
  CertificateMethod,
  CertificateNomenclatureCode,
  CertificateProduct,
  CertificateProductCondition,
  CertificateProductDocument,
  CertificateProductSizeUnit,
  CertificateStatus,
} from '../entities';

@Injectable()
export class CertificatesService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly usersService: UsersService,
    private readonly countriesService: CountriesService,
    private readonly buyersService: BuyersService,
    private readonly sellersService: SellersService,
    private readonly inspectionPlacesService: InspectionPlacesService,
    private readonly i18n: I18nService,
    private readonly i18nUtils: I18nUtilsService,
    private readonly storageService: StorageService,
    private readonly notificationsService: NotificationsService,
  ) {}

  async updateFollowUpEmailSentAt({ id }: Certificate): Promise<UpdateResult> {
    return Certificate.update({ id }, { followUpEmailSentAt: new Date() });
  }

  async findDraftedCertificatesForMoreThan2Weeks(): Promise<Certificate[]> {
    return Certificate.findBy({
      statusId: 'DRAFTED',
      followUpEmailSentAt: IsNull(),
      createdAt: Raw(
        (createdAt) => `AGE(NOW(), ${createdAt}) > INTERVAL '2 weeks'`,
      ),
    });
  }

  async findAllDocumentsByNomenclatureCodes(
    { skip, take }: PageOptionsDto,
    user?: JWTPayload,
  ): Promise<[CertificateNomenclatureCode[], number]> {
    const optionalFind: FindOptionsWhere<CertificateNomenclatureCode> = {};

    if (user) {
      optionalFind.certificate = {
        userId: user.sub,
      };
    }

    return CertificateNomenclatureCode.findAndCount({
      select: {
        certificateId: true,
        countryId: true,
        codeId: true,
        products: {
          name: true,
          documents: {
            typeId: true,
            key: true,
            filename: true,
          },
        },
      },
      order: {
        codeId: 'ASC',
        products: {
          name: 'ASC',
        },
      },
      relations: {
        products: {
          documents: true,
        },
      },
      where: {
        products: {
          documents: {
            key: Not(IsNull()),
          },
        },
        ...optionalFind,
      },
      loadEagerRelations: false,
      skip,
      take,
    });
  }

  async findAllDocumentsByCertificates(
    { skip, take }: PageOptionsDto,
    user?: JWTPayload,
  ): Promise<[Certificate[], number]> {
    const optionalFind: FindOptionsWhere<Certificate> = {};

    if (user) {
      optionalFind.userId = user.sub;
    }

    const [certificates, total] = await Certificate.findAndCount({
      select: {
        id: true,
        title: true,
        documents: true,
        nomenclatureCodes: {
          codeId: true,
          products: {
            name: true,
            documents: {
              typeId: true,
              key: true,
              filename: true,
            },
          },
        },
      },
      order: {
        id: 'DESC',
        nomenclatureCodes: {
          products: {
            name: 'ASC',
          },
        },
      },
      relations: {
        documents: true,
        nomenclatureCodes: {
          products: {
            documents: true,
          },
        },
      },
      where: [
        {
          documents: {
            key: Not(IsNull()),
          },
          ...optionalFind,
        },
        {
          nomenclatureCodes: {
            products: {
              documents: {
                key: Not(IsNull()),
              },
            },
          },
          ...optionalFind,
        },
      ],
      loadEagerRelations: false,
      skip,
      take,
    });

    return [
      certificates.map(
        (certificate) =>
          ({
            ...certificate,
            nomenclatureCodes: certificate.nomenclatureCodes
              ?.filter(
                ({ products }) =>
                  products?.filter(({ documents }) => documents?.length)
                    ?.length,
              )
              ?.map((nomenclatureCode) => ({
                ...nomenclatureCode,
                products: nomenclatureCode.products?.filter(
                  ({ documents }) => documents?.length,
                ),
              })),
          } as Certificate),
      ),
      total,
    ];
  }

  async findAll(
    { skip, take }: PageOptionsDto,
    sortByStatus?: Order,
  ): Promise<[Certificate[], number]> {
    return Certificate.findAndCount({
      order: {
        id: 'DESC',
        nomenclatureCodes: {
          products: {
            name: 'ASC',
          },
        },
        statusId: sortByStatus,
      },
      skip,
      take,
    });
  }

  async findByUser(
    { sub: userId }: JWTPayload,
    { skip, take }: PageOptionsDto,
    sortByStatus?: Order,
    statusId?: string,
  ): Promise<[Certificate[], number]> {
    const statusFilter = statusId ? { statusId } : {};

    return Certificate.findAndCount({
      where: {
        userId,
        ...statusFilter,
      },
      order: {
        id: 'DESC',
        statusId: sortByStatus,
      },
      skip,
      take,
    });
  }

  async create(user: JWTPayload): Promise<Certificate> {
    const { sub: userId } = user;

    const { id } = await Certificate.save({
      userId,
    });

    return this.findOne(id, user);
  }

  async findOne(id: number, { sub: userId }: JWTPayload): Promise<Certificate> {
    const userFilter = (await this.usersService.isAdmin(userId))
      ? {}
      : { userId };

    try {
      return await Certificate.findOneOrFail({
        where: {
          id,
          ...userFilter,
        },
        order: {
          nomenclatureCodes: {
            products: {
              name: 'ASC',
            },
          },
        },
      });
    } catch (e) {
      console.error(e);
      throw new NotFoundException(this.i18n.t('CERTIFICATE_NOT_FOUND'));
    }
  }

  async update(
    id: number,
    user: JWTPayload,
    dto: UpdateCertificateDto,
  ): Promise<Certificate> {
    const certificate = await this.findOne(id, user);

    await this.dataSource.transaction(async (manager) => {
      certificate.title = dto.title ?? certificate.title;
      certificate.inspectionDate =
        dto.inspectionDate ?? certificate.inspectionDate;
      certificate.expeditionMethodId =
        dto.expeditionMethod ?? certificate.expeditionMethodId;
      certificate.expeditionIncotermId =
        dto.expeditionIncoterm ?? certificate.expeditionIncotermId;
      certificate.totalCost = dto.totalCost ?? certificate.totalCost;
      certificate.statusId = dto.status ?? certificate.statusId;

      if (dto.status == 'IN_REVIEW' && !certificate.confirmationEmailSentAt) {
        const user = await this.usersService.findOneBy({
          id: certificate.userId,
        });
        certificate.confirmationEmailSentAt = new Date();

        this.notificationsService.send(
          user,
          'CONFIRMATION_OF_INTERNAL_HANDLING_OF_THE_DOCUMENT',
          { firstName: user.firstName },
          true,
        );
      }

      await Promise.all([
        this.updateCountry(dto, certificate),
        this.updateAuthority(dto, certificate, manager),
        this.updateSeller(dto, certificate, manager, user),
        this.updateBuyer(dto, certificate, manager, user),
        this.updateInspectionPlace(dto, certificate, manager, user),
      ]);

      await manager.save(certificate);

      await Promise.all([
        this.updateDocuments(dto, certificate, manager),
        this.updateProducts(dto, certificate, manager),
      ]);
    });

    return this.findOne(certificate.id, user);
  }

  async delete(id: number, { sub: userId }: JWTPayload): Promise<DeleteResult> {
    const userFilter = (await this.usersService.isAdmin(userId))
      ? {}
      : { userId };

    return Certificate.delete({
      id,
      ...userFilter,
    });
  }

  private async updateSeller(
    dto: UpdateCertificateDto,
    certificate: Certificate,
    manager: EntityManager,
    user: JWTPayload,
  ) {
    if (dto.seller && !dto.sellerId) {
      certificate.seller = await this.sellersService.create(
        user,
        dto.seller,
        manager,
      );
    } else if (dto.seller) {
      certificate.seller = await this.sellersService.update(
        user,
        dto.sellerId,
        dto.seller,
      );
    } else if (dto.sellerId) {
      certificate.seller = await this.sellersService.findOne(
        user,
        dto.sellerId,
      );
    }
  }

  private async updateBuyer(
    dto: UpdateCertificateDto,
    certificate: Certificate,
    manager: EntityManager,
    user: JWTPayload,
  ) {
    if (dto.buyer && !dto.buyerId) {
      certificate.buyer = await this.buyersService.create(
        user,
        dto.buyer,
        manager,
      );
    } else if (dto.buyer) {
      certificate.buyer = await this.buyersService.update(
        user,
        dto.buyerId,
        dto.buyer,
      );
    } else if (dto.buyerId) {
      certificate.buyer = await this.buyersService.findOne(user, dto.buyerId);
    }
  }

  private async updateInspectionPlace(
    dto: UpdateCertificateDto,
    certificate: Certificate,
    manager: EntityManager,
    user: JWTPayload,
  ) {
    if (dto.inspectionPlace && !dto.inspectionPlaceId) {
      certificate.inspectionPlace = await this.inspectionPlacesService.create(
        user,
        dto.inspectionPlace,
        manager,
      );
    } else if (dto.inspectionPlace) {
      certificate.inspectionPlace = await this.inspectionPlacesService.update(
        user,
        dto.inspectionPlaceId,
        dto.inspectionPlace,
      );
    } else if (dto.inspectionPlaceId) {
      certificate.inspectionPlace = await this.inspectionPlacesService.findOne(
        user,
        dto.inspectionPlaceId,
      );
    }
  }

  private async updateAuthority(
    dto: UpdateCertificateDto,
    certificate: Certificate,
    manager: EntityManager,
  ) {
    if (dto.customAuthority === null && certificate.customAuthorityId) {
      await manager.delete(CertificateCustomAuthority, {
        id: certificate.customAuthorityId,
      });
    } else if (dto.customAuthority !== undefined) {
      certificate.customAuthority = await manager.save(
        CertificateCustomAuthority,
        {
          id: certificate.customAuthorityId,
          ...dto.customAuthority,
        },
      );
    }
  }

  private async updateDocuments(
    dto: UpdateCertificateDto,
    certificate: Certificate,
    manager: EntityManager,
  ) {
    for (const documentDto of dto.documents || []) {
      if (!documentDto.key) {
        await manager.delete(CertificateDocument, {
          certificateId: certificate.id,
          typeId: documentDto.type,
        });
      }

      if (documentDto.base64) {
        const key = await this.storageService.putObject(documentDto.base64);

        await manager.save(CertificateDocument, {
          certificateId: certificate.id,
          typeId: documentDto.type,
          filename: documentDto.filename,
          key,
        });
      }
    }
  }

  private async updateProductDocuments(
    productDto: UpdateCertificateProductDto,
    nomenclatureCodeDto: UpdateCertificateNomenclatureCodeDto,
    certificate: Certificate,
    manager: EntityManager,
  ) {
    for (const documentDto of productDto.documents || []) {
      if (!documentDto.key) {
        await manager.delete(CertificateProductDocument, {
          certificateId: certificate.id,
          typeId: documentDto.type,
          code: nomenclatureCodeDto.code,
          name: productDto.name,
          country: certificate.countryId,
        });
      }

      if (documentDto.base64) {
        const key = await this.storageService.putObject(documentDto.base64);

        await manager.save(CertificateProductDocument, {
          certificateId: certificate.id,
          typeId: documentDto.type,
          filename: documentDto.filename,
          code: nomenclatureCodeDto.code,
          name: productDto.name,
          country: certificate.countryId,
          key,
        });
      }
    }
  }

  private async updateProducts(
    dto: UpdateCertificateDto,
    certificate: Certificate,
    manager: EntityManager,
  ) {
    for (const nomenclatureCodeDto of dto.nomenclatureCodes || []) {
      await this.countriesService.nomenclatureCodeExistsOrThrow(
        certificate.countryId,
        nomenclatureCodeDto.code,
      );

      await manager.upsert(
        CertificateNomenclatureCode,
        {
          certificateId: certificate.id,
          codeId: nomenclatureCodeDto.code,
          countryId: certificate.countryId,
        },
        ['certificateId', 'codeId', 'countryId'],
      );

      for (const productDto of nomenclatureCodeDto.products || []) {
        await manager.upsert(
          CertificateProduct,
          {
            certificateId: certificate.id,
            codeId: nomenclatureCodeDto.code,
            countryId: certificate.countryId,
            name: productDto.name,
            brand: productDto.brand ?? undefined,
            model: productDto.model ?? undefined,
            countryOrigin: productDto.countryOrigin ?? undefined,
            description: productDto.description ?? undefined,
            quantity: productDto.quantity ?? undefined,
            sizeUnitId: productDto.sizeUnit || undefined,
            conditionId: productDto.condition || undefined,
            unitPrice: productDto.unitPrice ?? undefined,
            standalone: productDto.standalone ?? undefined,
          },
          ['certificateId', 'codeId', 'countryId', 'name'],
        );

        await this.updateProductDocuments(
          productDto,
          nomenclatureCodeDto,
          certificate,
          manager,
        );
      }

      try {
        await manager.delete(CertificateProduct, {
          certificateId: certificate.id,
          codeId: nomenclatureCodeDto.code,
          countryId: certificate.countryId,
          name: Not(In(nomenclatureCodeDto.products?.map(({ name }) => name))),
        });
      } catch (e) {
        console.error(e);
      }
    }

    try {
      await manager.delete(CertificateNomenclatureCode, {
        certificateId: certificate.id,
        codeId: Not(In(dto.nomenclatureCodes?.map(({ code }) => code))),
      });
    } catch (e) {
      console.error(e);
    }
  }

  private async updateCountry(
    dto: UpdateCertificateDto,
    certificate: Certificate,
  ) {
    if (dto.country !== undefined) {
      if (dto.country) {
        await this.countriesService.existsOrThrow(dto.country);
      }

      certificate.countryId = dto.country ?? certificate.countryId;
    }
  }

  async findAllIncoterms(): Promise<CertificateIncoterm[]> {
    return CertificateIncoterm.find({ order: { name: 'ASC' } });
  }

  async findAllStatus(): Promise<CertificateStatus[]> {
    return CertificateStatus.find({ order: { name: 'ASC' } });
  }

  async findAllMethods(): Promise<CertificateMethod[]> {
    return CertificateMethod.find({
      order: { id: 'ASC' },
      select: { id: true, nameEn: true, nameFr: this.i18nUtils.isFrench() },
    });
  }

  async findAllProductConditions(): Promise<CertificateProductCondition[]> {
    return CertificateProductCondition.find({
      order: { id: 'ASC' },
      select: { id: true, nameEn: true, nameFr: this.i18nUtils.isFrench() },
    });
  }

  async findAllProductSizeUnits(): Promise<CertificateProductSizeUnit[]> {
    return CertificateProductSizeUnit.find({
      order: { id: 'ASC' },
      select: { id: true, nameEn: true, nameFr: this.i18nUtils.isFrench() },
    });
  }
}
