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

import { VariableService } from '../services/variable.service';
import { CreateVariableDto, UpdateVariableDto } from '../dtos/variable.dto';

@Controller('variable')
export class VariableController {
  constructor(private variableService: VariableService) {}

  @Get()
  findAll() {
    return this.variableService.findAll();
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.variableService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateVariableDto) {
    return this.variableService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateVariableDto,
  ) {
    return this.variableService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.variableService.remove(+id);
  }
}
