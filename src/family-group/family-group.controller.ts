import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { FamilyGroupService } from './family-group.service';
import { CreateFamilyGroupDto } from './dto/create-family-group.dto';
import { UpdateFamilyGroupDto } from './dto/update-family-group.dto';

@Controller('family-group')
export class FamilyGroupController {
  constructor(private readonly familyGroupService: FamilyGroupService) {}

  @Post()
  create(@Res() Res, @Body() createFamilyGroupDto: CreateFamilyGroupDto) {
    this.familyGroupService
      .create(createFamilyGroupDto)
      .then((group) => {
        return Res.status(HttpStatus.CREATED).json(group);
      })
      .catch((e) => {
        return Res.status(HttpStatus.BAD_REQUEST).json(e);
      });
  }

  @Get()
  findAll() {
    return this.familyGroupService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.familyGroupService.findOne(+id);
  }

  @Get('/chief/:id')
  findGroup(@Param('id') id: string) {
    return this.familyGroupService.findGroup(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFamilyGroupDto: UpdateFamilyGroupDto,
  ) {
    return this.familyGroupService.update(+id, updateFamilyGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.familyGroupService.remove(+id);
  }
}
