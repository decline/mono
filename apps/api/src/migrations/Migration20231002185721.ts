import { Migration } from '@mikro-orm/migrations';

export class Migration20231002185721 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "user" ("id" varchar(255) not null, "user_name" varchar(255) not null, "password" varchar(255) not null, "first_name" varchar(255) not null, "last_name" varchar(255) not null, "is_active" boolean not null default true, constraint "user_pkey" primary key ("id"));'
    );
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "user" cascade;');
  }
}
