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

import { StatusService } from '../services/status.service';
import { CreateStatusDto, UpdateStatusDto } from '../dtos/status.dto';

@Controller('status')
export class StatusController {
  constructor(private statusService: StatusService) {}

  @Get()
  findAll() {
    return this.statusService.findAll();
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.statusService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateStatusDto) {
    return this.statusService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateStatusDto,
  ) {
    return this.statusService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.statusService.remove(+id);
  }
}
