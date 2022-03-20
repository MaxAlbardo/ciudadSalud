import { IsEnum, IsNumber, IsString, IsUUID } from 'class-validator';
import { Home } from 'src/home/entity/home.entity';
import { Property } from '../enum/family-chief.enum';

export class CreateFamilyChiefDto {
  @IsString()
  personId: string;

  @IsString()
  numberPhone: string;

  @IsEnum(Property)
  property: Property;

  @IsUUID()
  home: Home;
}
