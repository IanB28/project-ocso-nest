import { ArrayNotEmpty, IsArray, IsOptional, IsString, MaxLength } from "class-validator";
import { Location } from "../entities/location.entity";
import { Region } from "src/regions/entities/region.entity";

export class CreateLocationDto {
    @IsString()
    @MaxLength(35)
    locationName: string;
    @IsString()
    @MaxLength(160)
    locationAdress: string;
    @IsArray()
    @ArrayNotEmpty()
    locationLatLng: number[];
    @IsOptional()
    region: Region;
}