import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { v4 as uuid } from 'uuid'; 
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private  employeeRepository: Repository<Employee>
  ){}

 async create(createEmployeeDto: CreateEmployeeDto) {
 // const employee = await this.employeeRepository.save(createEmployeeDto)
 //   return employee
// EL error que me da es en createEmployee, mejor seguire con los videos restantes y al final lo intentare solucionar
//  No overload matches this call.
//  Overload 1 of 4, '(entities: DeepPartial<Employee>[], options?: SaveOptions | undefined): Promise<(DeepPartial<Employee> & Employee)[]>', gave the following error.
//  Argument of type 'CreateEmployeeDto' is not assignable to parameter of type 'DeepPartial<Employee>[]'.
//    Type 'CreateEmployeeDto' is missing the following properties from type 'DeepPartial<Employee>[]': length, pop, push, concat, and 35 more.
//  Overload 2 of 4, '(entity: DeepPartial<Employee>, options?: SaveOptions | undefined): Promise<DeepPartial<Employee> & Employee>', gave the following error.
//  Argument of type 'CreateEmployeeDto' is not assignable to parameter of type 'DeepPartial<Employee>'.ts(2769)

  }

  findAll() {
    this.employeeRepository.find();
  }

  findOne(id: string) {
    const employee = this.employeeRepository.findOneBy({
      employeeId: id
    })
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    const employeeToUpdate = await this.employeeRepository.preload({
      employeeId: id,
      ...updateEmployeeDto
    });
  
    if (!employeeToUpdate) {
      throw new NotFoundException(`Employee with id ${id} not found`);
    }
  
    await this.employeeRepository.save(employeeToUpdate);
    return employeeToUpdate;
  }
  

  remove(id: string) {
    this.employeeRepository.delete({
      employeeId: id
    })
    return{
      message: `Employee with id ${id} has been deleted`
    }
  }
}
