import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ApiAuth } from './decorators/api.decorator';


@ApiAuth()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signup")
  signup(@Body() CreateAuthDto: CreateUserDto){
   return this.authService.registerUser(CreateAuthDto)
  }
  @Post("login")
  login(@Body() loginUserDto :LoginUserDto){
    console.log(loginUserDto);
   return this.authService.loginUser(loginUserDto)
  }
  @Patch("/:email")
  updateUser(@Param('email') userEmail, @Body() updateUserDto: UpdateUserDto ){
    return this.authService.updateUser(userEmail, updateUserDto)
  }
}
