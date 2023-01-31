import { EntityRepository } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: EntityRepository<UserEntity>,
  ) {}

  findAll(): Promise<UserEntity[]> {
    return this.usersRepository.findAll();
  }

  findOne(id: string): Promise<UserEntity | null> {
    return this.usersRepository.findOne({ id });
  }

  findOneByUsernameAndPassword(userName: string, password: string): Promise<UserEntity | null> {
    return this.usersRepository.findOne(
    { userName, password },
    );
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.nativeDelete({ id });
  }

  create(user: UserEntity) {
    return this.usersRepository.persistAndFlush(user);
  }
}
