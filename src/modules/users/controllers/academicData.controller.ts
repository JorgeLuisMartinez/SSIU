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

import { AcademicDataService } from '../services/academicData.service';
import {
  CreateAcademicDataDto,
  UpdateAcademicDataDto,
} from '../dtos/academicData.dto';

@Controller('academic-data')
export class AcademicDataController {
  constructor(private employmentDataService: AcademicDataService) {}

  @Get()
  findAll() {
    return this.employmentDataService.findAll();
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.employmentDataService.findOne(id);
  }

  @Get('by/:id')
  getByUser(@Param('id', ParseIntPipe) id: number) {
    return this.employmentDataService.findByUser(id);
  }

  @Post()
  create(@Body() payload: CreateAcademicDataDto) {
    return this.employmentDataService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateAcademicDataDto,
  ) {
    return this.employmentDataService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.employmentDataService.remove(+id);
  }
}
