import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsObject, IsString, MaxLength } from "class-validator";
import { Location } from "src/locations/entities/location.entity";

export class LocationEmployeeDto {
    @ApiProperty()
    locationId: number;

    @ApiPropertyOptional()
    locationName: string;

    @ApiPropertyOptional()
    locationLatLng: number[];

    @ApiPropertyOptional()
    locationAddress: string;

}


export class CreateEmployeeDto {
  @ApiProperty()
  @IsString()
  @MaxLength(30)
  name: string;
  @ApiProperty()
  @IsString()
  @MaxLength(70)
  lastName: string;
  @ApiProperty()
  @IsString()
  @MaxLength(10)
  phoneNumber: string;
  @ApiProperty()
  @IsString()
  @IsEmail()
  email: string;
  @ApiProperty()
  @IsObject()
  location: LocationEmployeeDto;
}

