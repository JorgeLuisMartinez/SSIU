import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Geographic_location } from '../entities/geographic_location.entity';
import { CreateGeographic_locationDto, UpdateGeographic_locationDto } from '../dtos/geographic_location.dto';

@Injectable()
export class Geographic_locationService {
  constructor(
    @InjectRepository(Geographic_location) private geographic_locationRepo: Repository<Geographic_location>,
  ) {}

  findAll() {
    return this.geographic_locationRepo.find();
  }

  findOne(id: number) {
    const user = this.geographic_locationRepo.findOne({
      where: { id: id },
      // relations: ['user'],
    });
    if (!user) {
      throw new NotFoundException(`Geographic location Repo #${id} not found`);
    }
    return user;
  }

  create(data: CreateGeographic_locationDto) {
    const newGeographic_location = this.geographic_locationRepo.create(data);
    return this.geographic_locationRepo.save(newGeographic_location);
  }

  async update(id: number, changes: UpdateGeographic_locationDto) {
    const newGeographic_location = await this.geographic_locationRepo.findOne({ where: { id: id } });
    this.geographic_locationRepo.merge(newGeographic_location, changes);
    return this.geographic_locationRepo.save(newGeographic_location);
  }

  remove(id: number) {
    return this.geographic_locationRepo.delete(id);
  }
}
