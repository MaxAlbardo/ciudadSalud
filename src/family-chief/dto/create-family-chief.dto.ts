import { IsEnum, IsNumber, IsString } from 'class-validator';
import { Home } from 'src/home/entity/home.entity';
import { Property } from '../enum/family-chief.enum';

export class CreateFamilyChiefDto {
  @IsString()
  id: string;

  @IsString()
  numberPhone: string;

  @IsEnum(Property)
  property: Property;

  @IsNumber()
  home: Home;
}
