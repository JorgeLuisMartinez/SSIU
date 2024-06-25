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
import { AcademicProgramsService } from '../services/academicPrograms.service';
import {
  CreateAcademicProgramsDto,
  UpdateAcademicProgramsDto,
} from '../dtos/academicPrograms.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.SPADMIN)
@Controller('academic-program')
export class AcademicProgramsController {
  constructor(private academicProgramsService: AcademicProgramsService) {}
  @Public()
  @Get()
  findAll() {
    return this.academicProgramsService.findAll();
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.academicProgramsService.findOne(id);
  }

  @Public()
  @Get('code/:id')
  getByCode(@Param('id', ParseIntPipe) id: number) {
    return this.academicProgramsService.findByCode(id);
  }

  @Public()
  @Get('user/:id')
  getByUser(@Param('id', ParseIntPipe) id: number) {
    return this.academicProgramsService.findByUser(id);
  }

  @Post()
  create(@Body() payload: CreateAcademicProgramsDto) {
    return this.academicProgramsService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateAcademicProgramsDto,
  ) {
    return this.academicProgramsService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.academicProgramsService.remove(+id);
  }
}
