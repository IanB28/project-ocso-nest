import { IsEmail, IsNumber, IsObject, IsString, MaxLength } from "class-validator";
import { Location } from "src/locations/entities/location.entity";

export class CreateManagerDto {
    @IsString()
    managerFullName: string;
    @IsString()
    @IsEmail()
    managerEmail: string;
    @IsNumber()
    managerSalary: number;
    @IsString()
    @MaxLength(16)
    managerPhonuNumber: string;
    @IsObject()
    location: Location;
}