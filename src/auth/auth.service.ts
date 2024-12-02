import { Injectable, NotFoundException } from '@nestjs/common';
import { LoginDto } from './dtos/Login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  validateUser(loginData: LoginDto) {
    if (loginData.email !== 'admin@gmail.com') {
      throw new NotFoundException("Admin with such email doesn't exist!");
    }
    if (loginData.password !== '1234567') {
      throw new NotFoundException('Password is incorrect!');
    }
    return this.jwtService.sign({ email: loginData.email });
  }
}
