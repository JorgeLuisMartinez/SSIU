import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import { Status } from '../../users/entities/status.entity';
import { User } from '../../users/entities/user.entity';
import { Stages } from '../../admin/entities/stages.entity';

@Entity()
export class AcademicPrograms {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: '255', unique: true })
  name: string;

  @Column({ type: 'bigint', unique: true })
  code: number;

  @Column({ type: 'varchar', length: '255', unique: true })
  email: string;

  @Column({ type: 'text', nullable: true })
  photoUrl: string;

  @ManyToOne(() => Status, (status) => status.academicProgram)
  @JoinColumn({ name: 'status_id' })
  status: Status;

  @ManyToOne(() => User, (user) => user.academicProgram)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Stages, (stage) => stage.academicProgram)
  stage: Stages[];
}
