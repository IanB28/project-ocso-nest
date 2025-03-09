import { Module } from '@nestjs/common';
import { ManagersService } from './managers.service';
import { ManagersController } from './managers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Manager } from './entities/manager.entity';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Manager])],
  controllers: [ManagersController],
  providers: [ManagersService],
})
export class ManagersModule {}
