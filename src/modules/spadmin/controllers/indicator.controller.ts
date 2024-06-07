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

import { IndicatorService } from '../services/indicator.service';
import { CreateIndicatorDto, UpdateIndicatorDto } from '../dtos/indicator.dto';

@Controller('indicator')
export class IndicatorController {
  constructor(private indicatorService: IndicatorService) {}

  @Get()
  findAll() {
    return this.indicatorService.findAll();
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.indicatorService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateIndicatorDto) {
    return this.indicatorService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateIndicatorDto,
  ) {
    return this.indicatorService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.indicatorService.remove(+id);
  }
}
