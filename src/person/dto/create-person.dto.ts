import { IsDateString, IsEnum, IsString } from 'class-validator';
import { Gender } from '../enum/person.enum';

export class CreatePersonDto {
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
}
