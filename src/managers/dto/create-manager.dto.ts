import { IsEmail, IsNumber, IsString, MaxLength } from "class-validator";


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

}