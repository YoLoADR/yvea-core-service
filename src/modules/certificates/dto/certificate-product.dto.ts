import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CertificateProduct } from '../entities';
import { CertificateProductDocumentDto } from './certificate-product-document.dto';

export class CertificateProductDto {
  @ApiProperty()
  name: string;

  @ApiPropertyOptional()
  brand?: string;

  @ApiPropertyOptional()
  model?: string;

  @ApiPropertyOptional()
  description?: string;

  @ApiPropertyOptional()
  quantity?: number;

  @ApiPropertyOptional({ name: 'country_origin' })
  countryOrigin?: string;

  @ApiPropertyOptional({ name: 'size_unit' })
  sizeUnit?: string;

  @ApiPropertyOptional()
  condition?: string;

  @ApiPropertyOptional({ name: 'unit_price' })
  unitPrice?: number;

  @ApiProperty()
  standalone: boolean;

  @ApiPropertyOptional({
    type: CertificateProductDocumentDto,
    isArray: true,
  })
  documents?: CertificateProductDocumentDto[];

  constructor(entity?: CertificateProduct) {
    this.name = entity?.name;
    this.unitPrice = entity?.unitPrice ?? undefined;
    this.quantity = entity?.quantity ?? undefined;
    this.brand = entity?.brand ?? undefined;
    this.model = entity?.model ?? undefined;
    this.description = entity?.description ?? undefined;
    this.quantity = entity?.quantity ?? undefined;
    this.sizeUnit = entity?.sizeUnitId ?? '';
    this.condition = entity?.conditionId ?? '';
    this.unitPrice = entity?.unitPrice ?? undefined;
    this.standalone = entity?.standalone;
    this.countryOrigin = entity?.countryOrigin;
    this.documents = entity?.documents?.length
      ? entity.documents.map((d) => new CertificateProductDocumentDto(d))
      : undefined;
  }
}
