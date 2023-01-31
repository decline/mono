import { Migrator } from '@mikro-orm/migrations';
import { defineConfig } from '@mikro-orm/postgresql';
import { UserEntity } from "@mono/user/api";

export default defineConfig({
  entities: [UserEntity],
  clientUrl: process.env['DATABASE_URL'],
  extensions: [Migrator],
  migrations: {
    path: `${__dirname}/migrations`,
    emit: 'js'
  }
});
