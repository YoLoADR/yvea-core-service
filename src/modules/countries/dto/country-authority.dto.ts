import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CountryAuthority } from '../entities';
import { CountryItemDto } from './country-item.dto';

export class CountryAuthorityDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiPropertyOptional()
  email?: string;

  @ApiPropertyOptional()
  phone?: string;

  @ApiPropertyOptional()
  contact?: string;

  @ApiProperty({ type: CountryItemDto, isArray: true })
  countries: CountryItemDto[];

  constructor(entity: CountryAuthority) {
    this.id = entity.id;
    this.name = entity.name;
    this.email = entity.email ?? undefined;
    this.phone = entity.phone ?? undefined;
    this.contact = entity.contact ?? undefined;
    this.countries =
      entity.registeredCertificationAuthorities &&
      entity.registeredCertificationAuthorities.length
        ? entity.registeredCertificationAuthorities.map(
            (rca) => new CountryItemDto(rca.country),
          )
        : undefined;
  }
}
