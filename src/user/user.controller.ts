import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/common/decorators';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiBody({ type: [CreateUserDto] })
  async create(@Res() Res, @Body() createUserDto: CreateUserDto) {
    this.userService
      .create(createUserDto)
      .then((user) => {
        return Res.status(HttpStatus.CREATED).json(user);
      })
      .catch((e) => {
        return Res.status(HttpStatus.BAD_REQUEST).json(e);
      });
  }

  @Auth()
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Auth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Auth()
  @Put(':id')
  @ApiBody({ type: [CreateUserDto] })
  update(
    @Res() Res,
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    this.userService
      .update(id, updateUserDto)
      .then((user) => {
        return Res.status(HttpStatus.ACCEPTED).json(user);
      })
      .catch((e) => {
        return Res.status(HttpStatus.BAD_REQUEST).json(e);
      });
  }

  @Auth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
