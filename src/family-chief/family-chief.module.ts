import { Module } from '@nestjs/common';
import { FamilyChiefService } from './family-chief.service';
import { FamilyChiefController } from './family-chief.controller';

@Module({
  controllers: [FamilyChiefController],
  providers: [FamilyChiefService]
})
export class FamilyChiefModule {}
