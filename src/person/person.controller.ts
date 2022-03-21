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
import { PersonService } from './person.service';
import { CreatePersonDto, UpdatePersonDto } from './dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/common/decorators';

@ApiTags('Person')
@Auth()
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
  @ApiBody({ type: [CreatePersonDto] })
  create(@Res() Res, @Body() createPersonDto: CreatePersonDto) {
    this.personService
      .createOne(createPersonDto)
      .then((person) => {
        return Res.status(HttpStatus.CREATED).json(person);
      })
      .catch((e) => {
        return Res.status(HttpStatus.BAD_REQUEST).json(e);
      });
  }

  @Put(':id')
  @ApiBody({ type: [CreatePersonDto] })
  update(
    @Res() Res,
    @Param('id') id: string,
    @Body() updatePersonDto: UpdatePersonDto,
  ) {
    this.personService
      .updatePerson(id, updatePersonDto)
      .then((person) => {
        return Res.status(HttpStatus.ACCEPTED).json(person);
      })
      .catch((e) => {
        return Res.status(HttpStatus.BAD_REQUEST).json(e);
      });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.personService.remove(+id);
  }
}
