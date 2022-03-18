import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { group } from 'console';
import { Repository } from 'typeorm';
import { CreateFamilyGroupDto } from './dto/create-family-group.dto';
import { UpdateFamilyGroupDto } from './dto/update-family-group.dto';
import { FamilyGroup } from './entities/family-group.entity';

@Injectable()
export class FamilyGroupService {
  constructor(
    @InjectRepository(FamilyGroup)
    private readonly GroupRepo: Repository<FamilyGroup>,
  ) {}

  async create(createFamilyGroupDto: CreateFamilyGroupDto) {
    const group = await this.GroupRepo.create(createFamilyGroupDto);
    return await this.GroupRepo.save(group);
  }

  async findAll(): Promise<FamilyGroup[]> {
    return await this.GroupRepo.find();
  }

  async findGroup(id: number): Promise<FamilyGroup[]> {
    const group = await this.GroupRepo.find({
      where: [{ chief: id }],
    });
    return group;
  }

  async findOne(id: number): Promise<FamilyGroup> {
    const group = await this.GroupRepo.findOne(id);
    if (!group) throw new NotFoundException('Persona no encontrada');
    return group;
  }

  async update(id: number, updateFamilyGroupDto: UpdateFamilyGroupDto) {
    const group = await this.GroupRepo.findOne(id);
    this.GroupRepo.merge(group, updateFamilyGroupDto);
    return this.GroupRepo.save(group);
  }

  async remove(id: number) {
    const res = await this.GroupRepo.delete(id);
    if (res.affected == 0) {
      throw new BadRequestException('Familiar no encontrado'); 
    }
    return res;
  }
}
