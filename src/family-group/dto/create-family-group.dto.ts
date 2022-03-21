import { IsEnum, IsString } from 'class-validator';
import { FamilyChief } from 'src/family-chief/entities/family-chief.entity';
import { Person } from 'src/person/entities/person.entity';
import { relationShipEnum } from '../enum/family-group.enum';

export class CreateFamilyGroupDto {
  @IsString()
  personId: Person;

  @IsEnum(relationShipEnum)
  relationship: relationShipEnum;

  @IsString()
  chief: FamilyChief;
}
