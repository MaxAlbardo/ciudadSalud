import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString } from 'class-validator';
import Square from '../enum/home.enum';

export class createHomeDto {
  @IsNumber()
  n_rooms: number;

  @IsNumber()
  n_population: number;

  @IsNumber()
  n_bathrooms: number;

  @IsNumber()
  n_home: number;

  @IsString()
  street: string;

  @IsString()
  @IsEnum(Square)
  square: Square;
}
