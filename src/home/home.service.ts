import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createHomeDto } from './dto/create-home.dto';
import { UpdateHomeDto } from './dto/update-home.dto';
import { Home } from './entity/home.entity';

@Injectable()
export class HomeService {
  constructor(
    @InjectRepository(Home)
    private homeRepository: Repository<Home>,
  ) {}

  async findAll(): Promise<Home[]> {
    return await this.homeRepository.find();
  }

  async findOne(id: string): Promise<Home> {
    const home = await this.homeRepository.findOne(id, {
      join: { alias: 'i', leftJoinAndSelect: { familyChief: 'i.familyChief' }}
    });
    if (!home) throw new NotFoundException('Home not found');
    return home;
  }

  async createOne(request: createHomeDto) {
    const home = await this.homeRepository.create(request);
    return await this.homeRepository.save(home);
  }

  async updateHome(id: string, request: UpdateHomeDto) {
    const home = await this.homeRepository.findOne(id);
    this.homeRepository.merge(home, request);
    return await this.homeRepository.save(home);
  }

  async deleteHome(id: string) {
    const res = await this.homeRepository.delete(id);
    if (res.affected == 0) {
      throw new BadRequestException('Casa no encontrada');
    }
    return res;
  }
}
