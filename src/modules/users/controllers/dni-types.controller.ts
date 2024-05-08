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

import { DniTypesService } from '../services/dniTypes.service';
import { CreateDniTypeDto, UpdateDniTypeDto } from '../dtos/dniType.dto';

@Controller('dni-types')
export class DniTypesController {
  constructor(private dniTypesService: DniTypesService) {}

  @Get()
  findAll() {
    return this.dniTypesService.findAll();
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.dniTypesService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateDniTypeDto) {
    return this.dniTypesService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateDniTypeDto,
  ) {
    return this.dniTypesService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.dniTypesService.remove(+id);
  }
}
