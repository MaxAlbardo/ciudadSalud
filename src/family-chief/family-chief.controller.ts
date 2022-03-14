import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Res,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { FamilyChiefService } from './family-chief.service';
import { CreateFamilyChiefDto } from './dto/create-family-chief.dto';
import { UpdateFamilyChiefDto } from './dto/update-family-chief.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('family-chief')
export class FamilyChiefController {
  constructor(private readonly familyChiefService: FamilyChiefService) {}

  @Post()
  // @ApiResponse({ status: 403, description: 'pito'})
  create(@Res() Res, @Body() createFamilyChiefDto: CreateFamilyChiefDto) {
    this.familyChiefService
      .create(createFamilyChiefDto)
      .then((chief) => {
        return Res.status(HttpStatus.CREATED).json(chief);
      })
      .catch((e) => {
        return Res.status(HttpStatus.BAD_REQUEST).json(e);
      });
  }

  @Get()
  findAll() {
    return this.familyChiefService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.familyChiefService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateFamilyChiefDto: UpdateFamilyChiefDto,
  ) {
    return this.familyChiefService.update(+id, updateFamilyChiefDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.familyChiefService.remove(+id);
  }
}
