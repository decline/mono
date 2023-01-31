import { JwtLoginResponse, JwtPayload } from '@mono/auth/shared';
import { UserEntity, UserService } from '@mono/user/api';
import { User } from '@mono/user/shared';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async validateUser(username: string, pass: string): Promise<User | null> {
    const user = await this.userService.findOneByUsernameAndPassword(username, pass);
    if (user && user.password === pass) {
      return UserEntity.convertToUser(user);
    }
    return null;
  }

  login(user: User): JwtLoginResponse {
    // create the payload for the JWT
    const payload: JwtPayload = {
      sub: user.id as string,
      id: user.id,
      userName: user.userName,
      firstName: user.firstName,
      lastName: user.lastName,
      isActive: user.isActive,
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
