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

import { CompanySectorService } from '../services/companySector.service';
import {
  CreateCompanySectorDto,
  UpdateCompanySectorDto,
} from '../dtos/companySector.dto';

@Controller('company-sector')
export class CompanySectorController {
  constructor(private companySectorService: CompanySectorService) {}

  @Get()
  findAll() {
    return this.companySectorService.findAll();
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.companySectorService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateCompanySectorDto) {
    return this.companySectorService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateCompanySectorDto,
  ) {
    return this.companySectorService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.companySectorService.remove(+id);
  }
}
