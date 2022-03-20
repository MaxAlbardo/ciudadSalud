import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  personId: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
