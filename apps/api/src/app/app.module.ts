import { MikroORM } from '@mikro-orm/core';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { AuthApiModule } from '@mono/auth/api';
import { CommonApiModule } from '@mono/common/api';
import { UserApiModule } from '@mono/user/api';
import { Module, OnModuleInit } from '@nestjs/common';
import MikroOrmConfig from '../mikro-orm.config';

@Module({
  imports: [
    AuthApiModule,
    CommonApiModule,
    MikroOrmModule.forRootAsync({
      useFactory: () => ({ ...MikroOrmConfig, autoLoadEntities: true }),
    }),
    UserApiModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly orm: MikroORM) {}

  async onModuleInit(): Promise<void> {
    await this.orm.getMigrator().up();
  }
}
