import { PartialType } from '@nestjs/mapped-types';
import { CreateFamilyChiefDto } from './create-family-chief.dto';

export class UpdateFamilyChiefDto extends PartialType(CreateFamilyChiefDto) {}
