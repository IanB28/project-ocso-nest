import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeesModule } from './employees/employees.module';
import { ProductsModule } from './products/products.module';
import { ConfigModule } from '@nestjs/config';
import { ProvidersModule } from './providers/providers.module';
import { ManagersModule } from './managers/managers.module';
import { RegionsModule } from './regions/regions.module';
import { LocationsModule } from './locations/locations.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { JWT_KEY } from './auth/constants/jwt.constants';
import { EXPIRES_IN } from './auth/constants/jwt.constants';

@Module({
  imports: [
    JwtModule.register({
      secret: JWT_KEY,
            signOptions:{
              expiresIn:EXPIRES_IN
            }
    }),
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.host,
    port: process.env.port ? Number(process.env.port) : undefined,
    username: 'postgres',
    password: "TheBestPassword",
    database: process.env.name,
    entities: [],
    autoLoadEntities: true,
    synchronize: true,
  }),EmployeesModule, ProductsModule, ProvidersModule, ManagersModule, RegionsModule, LocationsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}