import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsString } from 'class-validator';
import Square from '../enum/home.enum';

export class createHomeDto {
  @IsInt()
  n_rooms: number;

  @IsInt()
  n_population: number;

  @IsInt()
  n_bathrooms: number;

  @IsInt()
  n_home: number;

  @IsString()
  street: string;

  @IsString()
  @IsEnum(Square)
  square: Square;
}
