import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { EXPIRES_IN, JWT_KEY } from './constants/jwt.constants';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './guards/auth.guard';


@Module({
  imports:[
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: JWT_KEY,
      signOptions:{
        expiresIn:EXPIRES_IN,
      } 
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
