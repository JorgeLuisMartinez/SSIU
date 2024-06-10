import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import { Status } from '../../users/entities/status.entity';
import { Requests } from '../../spadmin/entities/requests.entity';
import { AcademicPrograms } from '../../spadmin/entities/academicPrograms.entity';

@Entity()
export class Stages {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: '12' })
  description: string;

  @Column({ type: 'timestamp' })
  start_date: Date;

  @Column({ type: 'timestamp' })
  finish_date: Date;

  @Column({ type: 'varchar', length: '48' })
  type_MDI: string;

  @ManyToOne(() => Status, (status) => status.stage)
  @JoinColumn({ name: 'status_id' })
  status: Status;

  @ManyToOne(() => AcademicPrograms, (academicProgram) => academicProgram.stage)
  @JoinColumn({ name: 'academic_program_id' })
  academicProgram: AcademicPrograms;

  @OneToMany(() => Requests, (request) => request.stage)
  request: Requests[];
}
