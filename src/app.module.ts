import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HomeModule } from './home/home.module';
import { PersonModule } from './person/person.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    autoLoadEntities: true,
  }),
  HomeModule,
  PersonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
