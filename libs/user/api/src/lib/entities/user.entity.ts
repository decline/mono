import { User } from '@mono/user/shared';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user' })
export class UserEntity implements User<string | undefined> {
  @PrimaryGeneratedColumn('uuid')
  id: string | undefined;

  @Column()
  userName: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: true })
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
