import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePersonDto, UpdatePersonDto } from './dto';
import { Person } from './entities/person.entity';

@Injectable()
export class PersonService {

  constructor(
    @InjectRepository(Person)
    private PersonRepository: Repository<Person>
  ) {}
  
  async findAll(): Promise<Person[]> {
    return await this.PersonRepository.find();
  }
  
  async findOne(id: number): Promise<Person> {
    const person = await this.PersonRepository.findOne(id);
    if(!person) throw new NotFoundException('Persona no encontrada');
    return person;
  }
  
  async createOne(createPersonDto: CreatePersonDto) {
    const person = await this.PersonRepository.create(createPersonDto);
    return await this.PersonRepository.save(person);
  }

  async updatePerson(id: number, updatePersonDto: UpdatePersonDto) {
    const person = await this.PersonRepository.findOne(id);
    this.PersonRepository.merge(person, updatePersonDto)
    return this.PersonRepository.save(person);
  }

  async remove(id: number) {
    return await this.PersonRepository.delete(id);
  }
}
