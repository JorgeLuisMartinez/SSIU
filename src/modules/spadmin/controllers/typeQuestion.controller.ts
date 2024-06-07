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

import { TypeQuestionService } from '../services/typeQuestion.service';
import {
  CreateTypeQuestionDto,
  UpdateTypeQuestionDto,
} from '../dtos/typeQuestion.dto';

@Controller('type-question')
export class TypeQuestionController {
  constructor(private typeQuestionService: TypeQuestionService) {}

  @Get()
  findAll() {
    return this.typeQuestionService.findAll();
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.typeQuestionService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateTypeQuestionDto) {
    return this.typeQuestionService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateTypeQuestionDto,
  ) {
    return this.typeQuestionService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.typeQuestionService.remove(+id);
  }
}
