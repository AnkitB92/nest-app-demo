import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  name!: string;

  @IsEmail({}, { message: 'Provide valid email' })
  email!: string;

  @IsEnum(['ADMIN', 'ENGINEER', 'INTERN'], {
    message: 'Provide valid role',
  })
  role!: 'ADMIN' | 'ENGINEER' | 'INTERN';
}
