import { PartialType } from '@nestjs/mapped-types';

export class CreateUserDto {
  constructor(public userName: string) {}
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
