'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const { Migration } = require('@mikro-orm/migrations');

class Migration20230131200246 extends Migration {

  async up() {
    this.addSql('create table "user" ("id" varchar(255) not null, "user_name" varchar(255) not null, "password" varchar(255) not null, "first_name" varchar(255) not null, "last_name" varchar(255) not null, "is_active" boolean not null default true, constraint "user_pkey" primary key ("id"));');
  }

  async down() {
    this.addSql('drop table if exists "user" cascade;');
  }

}
exports.Migration20230131200246 = Migration20230131200246;
