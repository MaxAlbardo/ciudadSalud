import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { createHomeDto } from './dto/create-home.dto';
import { UpdateHomeDto } from './dto/update-home.dto';
import { Home } from './entity/home.entity';
import { HomeService } from './home.service';

@Controller('home')
export class HomeController {
  constructor(private HomeService: HomeService) {}

  @Get()
  GetHomes(): Promise<Home[]> {
    return this.HomeService.findAll();
  }

  @Get(':id')
  GetHome(@Param() id: string): Promise<Home> {
    return this.HomeService.findOne(id);
  }

  @Post()
  createHome(@Res() Res, @Body() createHomeDto: createHomeDto) {
    this.HomeService.createOne(createHomeDto)
      .then((home) => {
        return Res.status(HttpStatus.CREATED).json(home);
      })
      .catch((e) => {
        return Res.status(HttpStatus.NOT_FOUND).json(e);
      });
  }

  @Put(':id')
  updateHome(
    @Param() id: string,
    @Res() Res,
    @Body() UpdateHomeDto: UpdateHomeDto,
  ) {
    this.HomeService.updateHome(id, UpdateHomeDto)
      .then((home) => {
        return Res.status(HttpStatus.ACCEPTED).json(home);
      })
      .catch((e) => {
        return Res.status(HttpStatus.BAD_REQUEST).json(e);
      });
  }

  @Delete(':id')
  deleteHome(@Param() id: string) {
    this.HomeService.deleteHome(id);
  }
}
