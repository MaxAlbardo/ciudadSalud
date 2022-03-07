import { Injectable } from '@nestjs/common';
import { CreateFamilyChiefDto } from './dto/create-family-chief.dto';
import { UpdateFamilyChiefDto } from './dto/update-family-chief.dto';

@Injectable()
export class FamilyChiefService {
  create(createFamilyChiefDto: CreateFamilyChiefDto) {
    return 'This action adds a new familyChief';
  }

  findAll() {
    return `This action returns all familyChief`;
  }

  findOne(id: number) {
    return `This action returns a #${id} familyChief`;
  }

  update(id: number, updateFamilyChiefDto: UpdateFamilyChiefDto) {
    return `This action updates a #${id} familyChief`;
  }

  remove(id: number) {
    return `This action removes a #${id} familyChief`;
  }
}
