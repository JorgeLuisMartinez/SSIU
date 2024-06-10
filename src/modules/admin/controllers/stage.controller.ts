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

import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from '../../auth/models/roles.model';
import { Public } from '../../auth/decorators/public.decorator';
import { StagesService } from '../services/stages.service';
import { CreateStageDto, UpdateStageDto } from '../dtos/stages.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
@Controller('stage')
export class AcademicProgramsController {
  constructor(private stagesService: StagesService) {}

  @Get()
  findAll() {
    return this.stagesService.findAll();
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.stagesService.findOne(id);
  }

  @Public()
  @Get('academic-program/:id')
  getByAcademicProgram(@Param('id', ParseIntPipe) id: number) {
    return this.stagesService.findByAcademicProgram(id);
  }

  @Post()
  create(@Body() payload: CreateStageDto) {
    return this.stagesService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateStageDto,
  ) {
    return this.stagesService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.stagesService.remove(+id);
  }
}
