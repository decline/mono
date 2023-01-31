import { MikroORM } from '@mikro-orm/core';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { AuthApiModule } from '@mono/auth/api';
import { CommonApiModule } from '@mono/common/api';
import { UserApiModule } from '@mono/user/api';
import { Module, OnModuleInit } from '@nestjs/common';
import mikroOrmConfig from '../mikro-orm.config';

@Module({
  imports: [MikroOrmModule.forRoot(mikroOrmConfig), AuthApiModule, CommonApiModule, UserApiModule],
  controllers: [],
  providers: [],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly orm: MikroORM) {}

  async onModuleInit(): Promise<void> {
    await this.orm.getMigrator().up();
  }
}
