import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HomeModule } from './home/home.module';
import { PersonModule } from './person/person.module';
import { FamilyChiefModule } from './family-chief/family-chief.module';
import { FamilyGroupModule } from './family-group/family-group.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    autoLoadEntities: true,
  }),
  HomeModule,
  PersonModule,
  FamilyChiefModule,
  FamilyGroupModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
