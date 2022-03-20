import { Module } from '@nestjs/common';
import { FamilyChiefService } from './family-chief.service';
import { FamilyChiefController } from './family-chief.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FamilyChief } from './entities/family-chief.entity';
import { PersonModule } from 'src/person/person.module';

@Module({
  imports: [TypeOrmModule.forFeature([FamilyChief]), PersonModule],
  controllers: [FamilyChiefController],
  providers: [FamilyChiefService],
  exports: [FamilyChiefService],
})
export class FamilyChiefModule {}
