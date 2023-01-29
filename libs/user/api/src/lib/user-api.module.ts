import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './controllers/user.controller';
import { UserEntity } from './entities/user.entity';
import { UserService } from './services/user.service';
import { UserSubscriber } from './subscribers/user.subscriber';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService, UserSubscriber],
  exports: [UserService],
})
export class UserApiModule {
  // constructor(private userService: UserService) {
  //   const user = new User('decline', 'test', 'Dominik', 'Huppmann');
  //
  //   userService.create(user);
  //
  //   userService.findAll().then((users) => console.log('All users:', users));
  // }
}
