import { Controller, Get, Post, Body, Param, Delete, Put, Res, HttpCode, HttpStatus } from '@nestjs/common';
import { PersonService } from './person.service';
import { CreatePersonDto, UpdatePersonDto } from './dto';

@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.personService.findOne(+id);
  }
  
  @Get()
  findAll() {
    return this.personService.findAll();
  }
  
  @Post()
  create(@Res() Res,@Body() createPersonDto: CreatePersonDto) {
    this.personService.createOne(createPersonDto).then((person) => {
      return Res.status(HttpStatus.CREATED).json(person);
    }).catch((e) => {
      return Res.status(HttpStatus.BAD_REQUEST).json(e);
    });
  }

  @Put(':id')
  update(@Res() Res,@Param('id') id: string, @Body() updatePersonDto: UpdatePersonDto) {
    this.personService.updatePerson(+id, updatePersonDto).then((person) => {
      return Res.status(HttpStatus.ACCEPTED).json(person);
    }).catch((e) => {
      return Res.status(HttpStatus.BAD_REQUEST).json(e);
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.personService.remove(+id);
  }
}
