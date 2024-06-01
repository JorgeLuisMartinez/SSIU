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

import { StudyTypesService } from '../services/studyTypes.service';
import {
  CreateStudyTypesDto,
  UpdateStudyTypesDto,
} from '../dtos/studyTypes.dto';

@Controller('study-types')
export class StudyTypesController {
  constructor(private studyTypesService: StudyTypesService) {}

  @Get()
  findAll() {
    return this.studyTypesService.findAll();
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.studyTypesService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateStudyTypesDto) {
    return this.studyTypesService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateStudyTypesDto,
  ) {
    return this.studyTypesService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.studyTypesService.remove(+id);
  }
}
