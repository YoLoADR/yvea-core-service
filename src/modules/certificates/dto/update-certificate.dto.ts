import { CreateBuyerDto } from '@modules/buyers/dto';
import { CreateInspectionPlaceDto } from '@modules/inspection-places/dto';
import { CreateSellerDto } from '@modules/sellers/dto';
import { ApiExtraModels, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import {
  CertificateCustomAuthorityDto,
  UpdateCertificateDocumentDto,
  UpdateCertificateNomenclatureCodeDto,
  UpdateCertificateProductDto,
} from '.';

@ApiExtraModels(UpdateCertificateProductDto)
export class UpdateCertificateDto {
  @ApiPropertyOptional({ name: 'total_cost' })
  @IsNumber({}, { message: i18nValidationMessage('validations.IS_NUMBER') })
  @IsOptional()
  totalCost?: number;

  @ApiPropertyOptional()
  @IsString({ message: i18nValidationMessage('validations.IS_STRING') })
  @IsNotEmpty({ message: i18nValidationMessage('validations.IS_NOT_EMPTY') })
  @IsOptional()
  title?: string;

  @ApiPropertyOptional()
  @IsString({ message: i18nValidationMessage('validations.IS_STRING') })
  @IsNotEmpty({ message: i18nValidationMessage('validations.IS_NOT_EMPTY') })
  @IsOptional()
  country?: string;

  @ApiPropertyOptional({
    name: 'nomenclature_codes',
    type: UpdateCertificateNomenclatureCodeDto,
    isArray: true,
  })
  @ValidateNested({
    each: true,
    message: i18nValidationMessage('validations.VALIDATE_NESTED'),
  })
  @Type(() => UpdateCertificateNomenclatureCodeDto)
  @IsOptional()
  nomenclatureCodes?: UpdateCertificateNomenclatureCodeDto[];

  @ApiPropertyOptional({
    name: 'custom_authority',
    type: CertificateCustomAuthorityDto,
  })
  @ValidateNested({
    message: i18nValidationMessage('validations.VALIDATE_NESTED'),
  })
  @Type(() => CertificateCustomAuthorityDto)
  @IsOptional()
  customAuthority?: CertificateCustomAuthorityDto;

  @ApiPropertyOptional({
    name: 'inspection_date',
    default: new Date().toISOString().split('T')[0],
  })
  @IsOptional()
  @IsDateString(
    {},
    {
      message: i18nValidationMessage('validations.IS_DATE_STRING'),
    },
  )
  @Transform(({ value }) =>
    value ? new Date(value).toISOString().split('T')[0] : undefined,
  )
  @MaxLength(10, { message: i18nValidationMessage('validations.MAX_LENGTH') })
  inspectionDate?: Date;

  @ApiPropertyOptional({ name: 'seller_id' })
  @IsNumber({}, { message: i18nValidationMessage('validations.IS_NUMBER') })
  @IsOptional()
  sellerId?: number;

  @ApiPropertyOptional({ type: CreateSellerDto })
  @ValidateNested({
    message: i18nValidationMessage('validations.VALIDATE_NESTED'),
  })
  @Type(() => CreateSellerDto)
  @IsOptional()
  seller?: CreateSellerDto;

  @ApiPropertyOptional({ name: 'buyer_id' })
  @IsNumber({}, { message: i18nValidationMessage('validations.IS_NUMBER') })
  @IsOptional()
  buyerId?: number;

  @ApiPropertyOptional({ type: CreateBuyerDto })
  @ValidateNested({
    message: i18nValidationMessage('validations.VALIDATE_NESTED'),
  })
  @Type(() => CreateBuyerDto)
  @IsOptional()
  buyer?: CreateBuyerDto;

  @ApiPropertyOptional({ name: 'inspection_place_id' })
  @IsNumber({}, { message: i18nValidationMessage('validations.IS_NUMBER') })
  @IsOptional()
  inspectionPlaceId?: number;

  @ApiPropertyOptional({
    name: 'inspection_place',
    type: CreateInspectionPlaceDto,
  })
  @ValidateNested({
    message: i18nValidationMessage('validations.VALIDATE_NESTED'),
  })
  @Type(() => CreateInspectionPlaceDto)
  @IsOptional()
  inspectionPlace?: CreateInspectionPlaceDto;

  @ApiPropertyOptional({ name: 'expedition_method' })
  @IsString({ message: i18nValidationMessage('validations.IS_STRING') })
  @IsNotEmpty({ message: i18nValidationMessage('validations.IS_NOT_EMPTY') })
  @IsOptional()
  expeditionMethod?: string;

  @ApiPropertyOptional({ name: 'expedition_incoterm' })
  @IsString({ message: i18nValidationMessage('validations.IS_STRING') })
  @IsNotEmpty({ message: i18nValidationMessage('validations.IS_NOT_EMPTY') })
  @IsOptional()
  expeditionIncoterm?: string;

  @ApiPropertyOptional()
  @IsString({ message: i18nValidationMessage('validations.IS_STRING') })
  @IsNotEmpty({ message: i18nValidationMessage('validations.IS_NOT_EMPTY') })
  @IsOptional()
  status?: string;

  @ApiPropertyOptional({
    type: UpdateCertificateDocumentDto,
    isArray: true,
  })
  @ValidateNested({
    each: true,
    message: i18nValidationMessage('validations.VALIDATE_NESTED'),
  })
  @Type(() => UpdateCertificateDocumentDto)
  @IsOptional()
  documents?: UpdateCertificateDocumentDto[];
}
