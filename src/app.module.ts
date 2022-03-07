import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HomeModule } from './home/home.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    autoLoadEntities: true,
  }),
  HomeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
