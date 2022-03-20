import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FamilyChiefService } from 'src/family-chief/family-chief.service';
import { PersonService } from 'src/person/person.service';
import { Repository } from 'typeorm';
import { CreateFamilyGroupDto } from './dto/create-family-group.dto';
import { UpdateFamilyGroupDto } from './dto/update-family-group.dto';
import { FamilyGroup } from './entities/family-group.entity';

@Injectable()
export class FamilyGroupService {
  constructor(
    @InjectRepository(FamilyGroup)
    private readonly GroupRepo: Repository<FamilyGroup>,
    private readonly personService: PersonService,
    private readonly chiefService: FamilyChiefService,
  ) {}

  async create(createFamilyGroupDto: CreateFamilyGroupDto) {
    const group = await this.GroupRepo.create(createFamilyGroupDto);
    const person = await this.personService.personDNI(createFamilyGroupDto.personId);
    const chief = await this.chiefService.findChief(createFamilyGroupDto.chief);
    group.person = person;
    group.chief = chief;
    return await this.GroupRepo.save(group);
  }

  async findAll(): Promise<FamilyGroup[]> {
    return await this.GroupRepo.find();
  }

  async findGroup(id: number): Promise<FamilyGroup[]> {
    const group = await this.GroupRepo.find({
      relations: ['chief'],
      where: [
        {
          chief: {
            person: {
              dni: id,
            },
          },
        },
      ],
    });
    return group;
  }

  async findOne(id: number): Promise<FamilyGroup> {
    const group = await this.GroupRepo.findOne({
      relations: ['person'],
      where: {
        person: {
          dni: id,
        },
      },
    });
    if (!group) throw new NotFoundException('Persona no encontrada');
    return group;
  }

  async update(id: number, updateFamilyGroupDto: UpdateFamilyGroupDto) {
    const group = await this.findOne(id);
    const person = await this.personService.personDNI(updateFamilyGroupDto.personId);
    const chief = await this.chiefService.findChief(updateFamilyGroupDto.chief);
    this.GroupRepo.merge(group, updateFamilyGroupDto);
    group.person = person;
    group.chief = chief;
    return await this.GroupRepo.save(group);
  }

  async remove(id: number) {
    const group = await this.findOne(id);
    const res = await this.GroupRepo.delete(group.id);
    return res;
  }
}
