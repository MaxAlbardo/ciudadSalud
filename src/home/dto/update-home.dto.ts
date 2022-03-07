import { PartialType } from '@nestjs/mapped-types';
import { createHomeDto } from './create-home.dto';

export class UpdateHomeDto extends PartialType(createHomeDto) {}