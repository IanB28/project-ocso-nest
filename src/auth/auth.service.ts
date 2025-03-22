import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { create } from 'domain';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class AuthService {
      constructor(@InjectRepository(User) private userRepository: Repository<User>,
    private  jwtService: JwtService,

  ) {}
        registerUser(createUserDto: CreateUserDto){
          createUserDto.userPassword = bcrypt.hashSync(createUserDto.userPassword, 5)
          return this.userRepository.save(createUserDto); 
  }  
  async loginUser(loginUserDto: LoginUserDto) {
    console.log(loginUserDto)
    const user = await this.userRepository.findOne({
      where:{
      userEmail: loginUserDto.userEmail,
      },
    })
console.log(user);
    if (!user) throw new UnauthorizedException("Usuario NO encontrado");
  
    const match = await bcrypt.compare
    (loginUserDto.userPassword,
       user.userPassword,
    )
    //src/auth/auth.service.ts:23:62 - error TS18047: 'user' is possibly 'null' por eso agregue el otro if:)
    console.log(match);
        if(!match) throw new UnauthorizedException("NO esta autorizado");
        const payload = {
          userEmail: user.userEmail, 
          userPassword: user.userPassword,
          userRoles: user.UserRoles
        }
        const token = this.jwtService.sign(payload);
    return token;
  }

 async updateUser(userEmail: string, updateUserDto: UpdateUserDto){
  const newUserData = await this.userRepository.preload({
      userEmail,
      ...updateUserDto
    })
    if (!newUserData) throw new UnauthorizedException("Usuario NO encontrado");

    this.userRepository.save(newUserData)
    return newUserData
  }

}
 