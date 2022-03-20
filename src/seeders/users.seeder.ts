import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seeder } from 'nestjs-seeder';
import { Person } from 'src/person/entities/person.entity';
import { Gender } from 'src/person/enum/person.enum';
import { CreateUserPersonDto } from 'src/user/dto/create-userPerson.dto';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';

Injectable();
export class UsersSeeder implements Seeder {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
  ) {}

  async seed(): Promise<any> {
    try {
      const UserDto: CreateUserPersonDto = {
        dni: '123456789',
        name: 'admin',
        lastName: 'admin',
        bornDate: new Date(),
        gender: Gender.MASCULINO,
        email: 'admin@ciudadsalud.com',
        password: '1234567890',
      };
      const person = this.personRepository.create(UserDto);
      await this.personRepository.save(person);
      const user: User = this.userRepository.create(UserDto);
      user.id = person.id;

      return await this.userRepository.save(user);
    } catch (exception: any) {
      console.log('Crear usuario: ', exception.message);
    }
    return true;
  }

  async drop(): Promise<any> {
    const person = await this.personRepository.findOne({
      where: { dni: '123456789' },
    });
    await this.personRepository.remove(person);

    const user = await this.userRepository.findOne({
      where: { email: 'admin@ciudadsalud.com' },
    });
    return await this.userRepository.remove(user);
  }
}
