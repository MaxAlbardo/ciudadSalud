import { IsDateString, IsEmail, IsEnum, IsString } from 'class-validator';
import { Gender } from 'src/person/enum/person.enum';

export class CreateUserPersonDto {
  @IsString()
  id?: string;

  @IsString()
  dni: string;

  @IsString()
  name: string;

  @IsString()
  lastName: string;

  @IsDateString()
  bornDate: Date;

  @IsString()
  @IsEnum(Gender)
  gender: Gender;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
