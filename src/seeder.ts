import { TypeOrmModule } from '@nestjs/typeorm';
import { seeder } from 'nestjs-seeder';
import { Person } from './person/entities/person.entity';
import { UsersSeeder } from './seeders/users.seeder';
import { User } from './user/entities';

seeder({
  imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([User, Person])],
}).run([UsersSeeder]);
