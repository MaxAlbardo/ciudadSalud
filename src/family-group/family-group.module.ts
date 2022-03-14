import { Module } from '@nestjs/common';
import { FamilyGroupService } from './family-group.service';
import { FamilyGroupController } from './family-group.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FamilyGroup } from './entities/family-group.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FamilyGroup])],
  controllers: [FamilyGroupController],
  providers: [FamilyGroupService],
})
export class FamilyGroupModule {}
