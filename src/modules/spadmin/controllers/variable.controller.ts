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

import { VariableService } from '../services/variable.service';
import { CreateVariableDto, UpdateVariableDto } from '../dtos/variable.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from '../../auth/models/roles.model';
import { Public } from '../../auth/decorators/public.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.SPADMIN)
@Controller('variable')
export class VariableController {
  constructor(private variableService: VariableService) {}

  //@Public()
  @Get()
  findAll() {
    return this.variableService.findAll();
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.variableService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateVariableDto) {
    return this.variableService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateVariableDto,
  ) {
    return this.variableService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.variableService.remove(+id);
  }
}
