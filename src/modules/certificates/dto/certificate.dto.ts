import { BuyerDto } from '@modules/buyers/dto';
import { InspectionPlaceDto } from '@modules/inspection-places/dto';
import { SellerDto } from '@modules/sellers/dto';
import {
  ApiExtraModels,
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';
import {
  CertificateCustomAuthorityDto,
  CertificateDocumentDto,
  CertificateNomenclatureCodeDto,
  CertificateProductDto,
} from '.';
import { Certificate } from '../entities';

@ApiExtraModels(CertificateProductDto)
export class CertificateDto {
  @ApiProperty()
  id: number;

  @ApiPropertyOptional({ name: 'total_cost' })
  totalCost?: number;

  @ApiPropertyOptional()
  title?: string;

  @ApiProperty()
  status: string;

  @ApiPropertyOptional()
  country?: string;

  @ApiPropertyOptional({
    name: 'nomenclature_codes',
    type: CertificateNomenclatureCodeDto,
    isArray: true,
  })
  nomenclatureCodes?: CertificateNomenclatureCodeDto[];

  @ApiPropertyOptional({
    name: 'custom_authority',
    type: CertificateCustomAuthorityDto,
  })
  customAuthority?: CertificateCustomAuthorityDto;

  @ApiPropertyOptional({
    name: 'inspection_date',
  })
  inspectionDate?: Date;

  @ApiPropertyOptional({ type: SellerDto })
  seller?: SellerDto;

  @ApiPropertyOptional({ type: BuyerDto })
  buyer?: BuyerDto;

  @ApiPropertyOptional({
    name: 'inspection_place',
    type: InspectionPlaceDto,
  })
  inspectionPlace?: InspectionPlaceDto;

  @ApiPropertyOptional({ name: 'expedition_method' })
  expeditionMethod?: string;

  @ApiPropertyOptional({ name: 'expedition_incoterm' })
  expeditionIncoterm?: string;

  @ApiPropertyOptional({
    type: CertificateDocumentDto,
    isArray: true,
  })
  documents?: CertificateDocumentDto[];

  @ApiProperty({
    name: 'created_at',
  })
  createdAt: Date;

  constructor(entity: Certificate) {
    this.id = entity.id ?? undefined;
    this.totalCost = entity.totalCost ?? undefined;
    this.title = entity.title ?? undefined;
    this.status = entity.statusId ?? undefined;
    this.country = entity.countryId ?? undefined;
    this.nomenclatureCodes = entity.nomenclatureCodes.length
      ? entity.nomenclatureCodes.map(
          (nc) => new CertificateNomenclatureCodeDto(nc),
        )
      : undefined;
    this.customAuthority = entity.customAuthority
      ? new CertificateCustomAuthorityDto(entity.customAuthority)
      : undefined;
    this.inspectionDate = entity.inspectionDate ?? undefined;
    this.seller = entity.seller ? new SellerDto(entity.seller) : undefined;
    this.buyer = entity.buyer ? new BuyerDto(entity.buyer) : undefined;
    this.inspectionPlace = entity.inspectionPlace
      ? new InspectionPlaceDto(entity.inspectionPlace)
      : undefined;
    this.expeditionMethod = entity.expeditionMethodId ?? undefined;
    this.expeditionIncoterm = entity.expeditionIncotermId ?? undefined;
    this.documents = entity?.documents.length
      ? entity.documents.map((d) => new CertificateDocumentDto(d))
      : undefined;
    this.createdAt = entity.createdAt;
  }
}
