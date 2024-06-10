import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Status } from '../../users/entities/status.entity';
import { Stages } from '../../admin/entities/stages.entity';

@Entity()
export class Requests {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: '255' })
  reason: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  request_date: Date;

  @Column({ type: 'timestamp', nullable: true })
  attention_date: Date;

  @ManyToOne(() => Status, (status) => status.request)
  @JoinColumn({ name: 'status_id' })
  status: Status;

  @ManyToOne(() => Stages, (stage) => stage.request)
  @JoinColumn({ name: 'stage_id' })
  stage: Stages;
}
