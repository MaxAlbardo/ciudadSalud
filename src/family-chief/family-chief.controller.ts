import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FamilyChiefService } from './family-chief.service';
import { CreateFamilyChiefDto } from './dto/create-family-chief.dto';
import { UpdateFamilyChiefDto } from './dto/update-family-chief.dto';

@Controller('family-chief')
export class FamilyChiefController {
  constructor(private readonly familyChiefService: FamilyChiefService) {}

  @Post()
  create(@Body() createFamilyChiefDto: CreateFamilyChiefDto) {
    return this.familyChiefService.create(createFamilyChiefDto);
  }

  @Get()
  findAll() {
    return this.familyChiefService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.familyChiefService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFamilyChiefDto: UpdateFamilyChiefDto) {
    return this.familyChiefService.update(+id, updateFamilyChiefDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.familyChiefService.remove(+id);
  }
}
