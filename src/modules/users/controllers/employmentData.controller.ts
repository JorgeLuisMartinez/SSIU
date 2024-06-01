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

import { EmploymentDataService } from '../services/employmentData.service';
import {
  CreateEmploymentDataDto,
  UpdateEmploymentDataDto,
} from '../dtos/employmentData.dto';

@Controller('employment-data')
export class EmploymentDataController {
  constructor(private employmentDataService: EmploymentDataService) {}

  @Get()
  findAll() {
    return this.employmentDataService.findAll();
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.employmentDataService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateEmploymentDataDto) {
    return this.employmentDataService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateEmploymentDataDto,
  ) {
    return this.employmentDataService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.employmentDataService.remove(+id);
  }
}
