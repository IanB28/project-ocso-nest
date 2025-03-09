import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { create } from 'domain';


@Injectable()
export class AuthService {
      constructor(@InjectRepository(User) private userRepository: Repository<User>){}
        registerUser(createUserDto: CreateUserDto){
          createUserDto.userPassword = bcrypt.hashSync(createUserDto.userPassword, 5)
          return this.userRepository.save(createUserDto); 
  }  
  async loginUser(createUserDto: CreateUserDto){
    const user = await this.userRepository.findOne({
      where:{
      userEmail: createUserDto.userEmail
      }
    })
    if (!user) {
      throw new UnauthorizedException("Usuario NO encontrado");
    }
    const match = await bcrypt.compare(createUserDto.userPassword, user.userPassword)
    //src/auth/auth.service.ts:23:62 - error TS18047: 'user' is possibly 'null' por eso agregue el otro if:)
        if(!match) throw new UnauthorizedException("NO esta autorizado");
    return;
  }
}
