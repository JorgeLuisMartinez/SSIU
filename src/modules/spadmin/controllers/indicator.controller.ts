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

import { IndicatorService } from '../services/indicator.service';
import { CreateIndicatorDto, UpdateIndicatorDto } from '../dtos/indicator.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from '../../auth/models/roles.model';
import { Public } from '../../auth/decorators/public.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.SPADMIN)
@Controller('indicator')
export class IndicatorController {
  constructor(private indicatorService: IndicatorService) {}
  @Public()
  @Get()
  findAll() {
    return this.indicatorService.findAll();
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.indicatorService.findOne(id);
  }

  @Public()
  @Get('by/:id')
  getByVariable(@Param('id', ParseIntPipe) id: number) {
    return this.indicatorService.findByVariable(id);
  }

  @Post()
  create(@Body() payload: CreateIndicatorDto) {
    return this.indicatorService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateIndicatorDto,
  ) {
    return this.indicatorService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.indicatorService.remove(+id);
  }
}
