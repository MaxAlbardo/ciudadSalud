import { IsEnum, IsString, IsUUID } from 'class-validator';
import { FamilyChief } from 'src/family-chief/entities/family-chief.entity';
import { Person } from 'src/person/entities/person.entity';
import { relationShipEnum } from '../enum/family-group.enum';

export class CreateFamilyGroupDto {
  @IsUUID()
  person: Person;

  @IsEnum(relationShipEnum)
  relationship: relationShipEnum;

  @IsUUID()
  chief: FamilyChief;
}
