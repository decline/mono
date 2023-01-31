import { Controller, Get } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';
import { UserService } from '../services/user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  // @TODO This is just some dummy endpoint for now. Add DTO with validation.
  @Get('create')
  create() {
    const user = new UserEntity('decline', 'test', 'John', 'Doe');
    this.userService
      .create(user)
      .then(() => this.userService.findAll().then(users => console.log('All users:', users)));
  }
}
