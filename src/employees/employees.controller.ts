import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UseInterceptors, UploadedFile } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { version } from 'os';
import { FileInterceptor } from '@nestjs/platform-express';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ROLES } from 'src/auth/constants/roles.contants';
import { ApiResponse } from '@nestjs/swagger';
import { Employee } from './entities/employee.entity';
import { ApiAuth } from 'src/auth/decorators/api.decorator';


@ApiAuth()
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Auth(ROLES.MANAGER)
  @ApiResponse({
    status : 201,
    example:{
      employeeId: "UUID",
      employeeName: "Jake",
      employeeEmail: "jake@gamail.com",
      employeeLastName: "Buzzo",
      employeePhoneNumber: "123456789",
      employeePhoto: "URL"
    } 

  })



  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeesService.create(createEmployeeDto);
  }

  @Auth(ROLES.MANAGER, ROLES.EMPLOYEE)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file',{
    dest: "./src/employees-photos" 
  }
  ))

  uploadPhoto(@UploadedFile() file: Express.Multer.File){
    console.log(file);
    return "OK";
  }
  @Auth(ROLES.MANAGER)
  @Get()
  findAll() {
    return this.employeesService.findAll();
  }

  @Auth(ROLES.MANAGER)
  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe({version:'4' }))
   id: string) {
    return this.employeesService.findOne(id);
  }

  @Auth(ROLES.MANAGER)
  @Get('/locarion/:id')
  findAllLocation(@Param('id')id: string){
    return this.employeesService.findByLocation(+id);
  }

  @Auth(ROLES.EMPLOYEE)
  @Patch(':id')
  update(@Param('id', new ParseUUIDPipe({ version: '4' }))
  id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeesService.update(id, updateEmployeeDto);
  }

  @Auth(ROLES.MANAGER)
  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe({ version: '4' }))
   id: string
  ){
    return this.employeesService.remove(id);
  }
}