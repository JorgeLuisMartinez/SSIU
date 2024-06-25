import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';

import { QuestionService } from '../services/question.service';
import { CreateQuestionDto, UpdateQuestionDto } from '../dtos/questions.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from '../../auth/models/roles.model';
import { Public } from '../../auth/decorators/public.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.SPADMIN)
@Controller('question')
export class QuestionController {
  constructor(private questionService: QuestionService) {}
  @Public()
  @Get()
  findAll() {
    return this.questionService.findAll();
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.questionService.findOne(id);
  }

  @Public()
  @Get('by/:id')
  getByIndicator(@Param('id', ParseIntPipe) id: number) {
    return this.questionService.findByIndicator(id);
  }

  @Post()
  create(@Body() payload: CreateQuestionDto) {
    return this.questionService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateQuestionDto,
  ) {
    return this.questionService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.questionService.remove(+id);
  }
}
