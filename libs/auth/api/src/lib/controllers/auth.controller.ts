import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtLoginResponse } from '@mono/auth/shared';
import { User } from '@mono/user/shared';
// import { Request } from 'express';
import { Public } from '../constants';
import { AuthService } from '../services/auth.service';
import { LocalGuard } from '../services/local.guard';

// currently just used for not installing "express" peer dependency via pnpm
interface Request {
  user: User
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalGuard)
  @Post('login')
  login(@Req() req: Request): JwtLoginResponse {
    return this.authService.login(req.user as User);
  }

  @Get('info')
  getInfo(@Req() req: Request): User {
    return req.user as User;
  }
}
