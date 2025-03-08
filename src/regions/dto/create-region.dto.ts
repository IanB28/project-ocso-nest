import { IsString, MaxLength } from "class-validator";


export class CreateRegionDto {
    @IsString()
    @MaxLength(100)
    regionName: string;
    @IsString()
    regionStates: string[]
}
