import { CreateUserDto } from './create-user.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  id: number;
}
