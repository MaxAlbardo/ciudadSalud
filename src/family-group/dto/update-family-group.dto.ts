import { PartialType } from '@nestjs/swagger';
import { CreateFamilyGroupDto } from './create-family-group.dto';

export class UpdateFamilyGroupDto extends PartialType(CreateFamilyGroupDto) {}
