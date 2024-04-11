import { ApiProperty } from '@nestjs/swagger';
import { InspectionPlace } from '../entities';

export class InspectionPlaceDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  address: string;

  @ApiProperty({ name: 'postal_code' })
  postalCode: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  country: string;

  @ApiProperty({ name: 'contact_name' })
  contactName: string;

  @ApiProperty({ name: 'contact_lastname' })
  contactLastname: string;

  constructor(entity: InspectionPlace) {
    this.id = entity.id;
    this.name = entity.name;
    this.email = entity.email;
    this.phone = entity.phone;
    this.address = entity.address;
    this.postalCode = entity.postalCode;
    this.city = entity.city;
    this.country = entity.country;
    this.contactName = entity.contactName;
    this.contactLastname = entity.contactLastname;
  }
}
