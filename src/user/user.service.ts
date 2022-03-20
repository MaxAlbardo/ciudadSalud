import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonService } from 'src/person/person.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

export interface UserFindByEmail {
  id?: number;
  email?: string;
}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private readonly personService: PersonService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepo.create(createUserDto);
    const person = await this.personService.personDNI(createUserDto.personId);
    user.person = person;
    return this.userRepo.save(user);
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(id: number) {
    const user = await this.userRepo.findOne(id);
    if (!user) throw new NotFoundException('Usuario no encontrado');
    const { password, ...rest } = user;
    return rest;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepo.findOne({
      relations: ['person'],
      where: {
        person: {
          dni: id,
        }
      }
    });
    const person = await this.personService.personDNI(updateUserDto.personId);
    this.userRepo.merge(user, updateUserDto);
    user.person = person;
    return await this.userRepo.save(user);
  }

  async remove(id: number) {
    const user = await this.userRepo.findOne({
      relations: ['person'],
      where: {
        person: {
          dni: id,
        }
      }
    });
    if (!user) {
      throw new BadRequestException('Usuario no encontrado');
    }
    const res = await this.userRepo.delete(user.id);
    return res;
  }

  async findByEmail(data: UserFindByEmail) {
    return await this.userRepo
      .createQueryBuilder('user')
      .where(data)
      .addSelect('user.password')
      .getOne();
  }
}
