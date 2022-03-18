import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFamilyChiefDto } from './dto/create-family-chief.dto';
import { UpdateFamilyChiefDto } from './dto/update-family-chief.dto';
import { FamilyChief } from './entities/family-chief.entity';

@Injectable()
export class FamilyChiefService {
  constructor(
    @InjectRepository(FamilyChief)
    private FamilyChiefRepository: Repository<FamilyChief>,
  ) {}

  async create(createFamilyChiefDto: CreateFamilyChiefDto) {
    const chief = await this.FamilyChiefRepository.create(createFamilyChiefDto);
    return await this.FamilyChiefRepository.save(chief);
  }

  async findAll(): Promise<FamilyChief[]> {
    return await this.FamilyChiefRepository.find();
  }

  async findOne(id: number): Promise<FamilyChief> {
    const chief = await this.FamilyChiefRepository.findOne(id);
    if (!chief) throw new NotFoundException('Jefe Familair no encontrado');
    return chief;
  }

  async update(id: number, updateFamilyChiefDto: UpdateFamilyChiefDto) {
    const chief = await this.FamilyChiefRepository.findOne(id);
    this.FamilyChiefRepository.merge(chief, updateFamilyChiefDto);
    return await this.FamilyChiefRepository.save(chief);
  }

  async remove(id: number) {
    const res = await this.FamilyChiefRepository.delete(+id);
    if (res.affected == 0) {
      throw new BadRequestException('Jefe Familiar no encontrado');
    }
    return res;
  }
}
