import { IsEnum, IsString } from 'class-validator';
import { FamilyChief } from 'src/family-chief/entities/family-chief.entity';
import { relationShipEnum } from '../enum/family-group.enum';

export class CreateFamilyGroupDto {
  @IsString()
  id: string;

  @IsEnum(relationShipEnum)
  relationship: relationShipEnum;

  @IsString()
  chief: FamilyChief;
}
