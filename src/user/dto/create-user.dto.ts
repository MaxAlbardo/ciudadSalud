import { IsEmail, IsString } from 'class-validator';
import { Person } from 'src/person/entities/person.entity';

export class CreateUserDto {
  @IsString()
  personId: Person;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
