import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonService } from 'src/person/person.service';
import { Repository } from 'typeorm';
import { CreateFamilyChiefDto } from './dto/create-family-chief.dto';
import { UpdateFamilyChiefDto } from './dto/update-family-chief.dto';
import { FamilyChief } from './entities/family-chief.entity';

@Injectable()
export class FamilyChiefService {
  constructor(
    @InjectRepository(FamilyChief)
    private readonly FamilyChiefRepository: Repository<FamilyChief>,
    private readonly personService: PersonService,
  ) {}

  async create(createFamilyChiefDto: CreateFamilyChiefDto) {
    const chief = await this.FamilyChiefRepository.create(createFamilyChiefDto);
      return await this.FamilyChiefRepository.save(chief);
  }

  async findAll(): Promise<FamilyChief[]> {
    return await this.FamilyChiefRepository.find();
  }

  async findOne(id: string): Promise<FamilyChief> {
    const chief = await this.FamilyChiefRepository.findOne({
      relations: ['person'],
      where: {
        person: {
          id: id,
        },
      },
    });
    if (!chief) throw new NotFoundException('Jefe Familair no encontrado');
    return chief;
  }

  async update(id: string, updateFamilyChiefDto: UpdateFamilyChiefDto) {
    const chief = await this.findOne(id);
    this.FamilyChiefRepository.merge(chief, updateFamilyChiefDto);
    chief.person = updateFamilyChiefDto.person;
    return await this.FamilyChiefRepository.save(chief);
  }

  async remove(id: string) {
    const chief = await this.findOne(id);
    const res = await this.FamilyChiefRepository.delete(chief.id);
    return res;
  }

  async findChief(id: FamilyChief) {
    const chief = await this.FamilyChiefRepository.findOne({
      relations: ['person'],
      where: {
        person: {
          dni: id,
        },
      },
    });
    if (!chief) throw new NotFoundException('Jefe Familair no encontrado');
    return chief;
  }
}
