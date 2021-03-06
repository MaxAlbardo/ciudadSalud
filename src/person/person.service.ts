import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePersonDto, UpdatePersonDto } from './dto';
import { Person } from './entities/person.entity';

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(Person)
    private PersonRepository: Repository<Person>,
  ) {}

  async findAll(): Promise<Person[]> {
    return await this.PersonRepository.find();
  }

  async findOne(id: string): Promise<Person> {
    const person = await this.PersonRepository.findOne(id);
    return person;
  }

  async createOne(createPersonDto: CreatePersonDto) {
    const person = await this.PersonRepository.create(createPersonDto);
    return await this.PersonRepository.save(person);
  }

  async updatePerson(id: string, updatePersonDto: UpdatePersonDto) {
    const person = await this.findOne(id);
    this.PersonRepository.merge(person, updatePersonDto);
    return await this.PersonRepository.save(person);
  }

  async remove(id: string) {
    const res = await this.PersonRepository.delete(id);
    if (res.affected == 0) {
      throw new BadRequestException('Persona no encontrada');
    }
    return res;
  }
}
