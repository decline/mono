import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { User } from '@mono/user/shared';

@Entity({ tableName: 'user' })
export class UserEntity implements User<string | undefined> {
  @PrimaryKey() // @TODO should be uuid
  id: string | undefined;

  @Property()
  userName: string;

  @Property()
  password: string;

  @Property()
  firstName: string;

  @Property()
  lastName: string;

  @Property({ default: true })
  isActive: boolean;

  constructor(userName: string, password: string, firstName: string, lastName: string, isActive = true) {
    this.userName = userName;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.isActive = isActive;
  }

  public static convertToUser(user: UserEntity): User {
    return {
      id: user.id as string,
      userName: user.userName,
      firstName: user.firstName,
      lastName: user.lastName,
      isActive: user.isActive,
    };
  }
}
