import { Module } from '@nestjs/common';
import { FamilyChiefService } from './family-chief.service';
import { FamilyChiefController } from './family-chief.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FamilyChief } from './entities/family-chief.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FamilyChief])],
  controllers: [FamilyChiefController],
  providers: [FamilyChiefService],
})
export class FamilyChiefModule {}
