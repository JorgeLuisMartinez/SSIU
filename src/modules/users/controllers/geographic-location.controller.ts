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

import { Geographic_locationService } from '../services/geographic_location.service';
import { CreateGeographic_locationDto, UpdateGeographic_locationDto } from '../dtos/geographic_location.dto';

@Controller('geographic_location')
export class Geographic_locationController {
  constructor(private geographic_locationService: Geographic_locationService) {}

  @Get()
  findAll() {
    return this.geographic_locationService.findAll();
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.geographic_locationService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateGeographic_locationDto) {
    return this.geographic_locationService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateGeographic_locationDto,
  ) {
    return this.geographic_locationService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.geographic_locationService.remove(+id);
  }
}
