import { IsEmail, IsObject, IsString, MaxLength } from "class-validator";
import { Location } from "src/locations/entities/location.entity";

export class CreateEmployeeDto {
  @IsString()
  @MaxLength(30)
  name: string;

  @IsString()
  @MaxLength(70)
  lastName: string;

  @IsString()
  @MaxLength(10)
  phoneNumber: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsObject()
  location: Location;
}