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
import { RequestsService } from '../services/requests.service';
import { CreateRequestsDto, UpdateRequestsDto } from '../dtos/requests.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.SPADMIN)
@Controller('request')
export class RequestsController {
  constructor(private requestsService: RequestsService) {}

  @Get()
  findAll() {
    return this.requestsService.findAll();
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.requestsService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateRequestsDto) {
    return this.requestsService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateRequestsDto,
  ) {
    return this.requestsService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.requestsService.remove(+id);
  }
}
