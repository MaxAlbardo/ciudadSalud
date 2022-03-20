import { Module } from '@nestjs/common';
import { FamilyGroupService } from './family-group.service';
import { FamilyGroupController } from './family-group.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FamilyGroup } from './entities/family-group.entity';
import { PersonModule } from 'src/person/person.module';
import { FamilyChiefModule } from 'src/family-chief/family-chief.module';

@Module({
  imports: [TypeOrmModule.forFeature([FamilyGroup]), PersonModule, FamilyChiefModule],
  controllers: [FamilyGroupController],
  providers: [FamilyGroupService],
})
export class FamilyGroupModule {}
