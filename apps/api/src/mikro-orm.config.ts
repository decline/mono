import { Migrator } from '@mikro-orm/migrations';
import { defineConfig } from '@mikro-orm/postgresql';
import * as process from 'process';

const libsFolder = './../../../libs';

export default defineConfig({
  baseDir: __dirname,
  entitiesTs: [`${libsFolder}/user/api/**/entities/*.entity.ts`],
  discovery: {
    warnWhenNoEntities: false, // mikro-orm would throw an error, when we don't provide the "entities" property. But we don't need it, since we only need to have "entitiesTs" through ts-node
  },
  clientUrl: process.env['DATABASE_URL'],
  forceUtcTimezone: true,
  extensions: [Migrator],
  migrations: {
    path: `./migrations`,
    pathTs: `./migrations`,
  },
});
