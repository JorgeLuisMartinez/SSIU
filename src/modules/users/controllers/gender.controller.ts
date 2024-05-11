import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';

import { GendersService } from '../services/genders.service';
import { CreateGenderDto, UpdateGenderDto } from '../dtos/gender.dto';

@Controller('genders')
export class GenderController {
  constructor(private gendersService: GendersService) {}

  @Get()
  findAll() {
    return this.gendersService.findAll();
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.gendersService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateGenderDto) {
    return this.gendersService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateGenderDto,
  ) {
    return this.gendersService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.gendersService.remove(+id);
  }
}
