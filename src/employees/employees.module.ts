import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { AuthModule } from 'src/auth/auth.module'; 
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([Employee]),
    AuthModule, 
  ],
  controllers: [EmployeesController],
  providers: [EmployeesService, AuthGuard], 
})
export class EmployeesModule {}
